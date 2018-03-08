import { featureCollection } from "@turf/helpers";
import * as fs from "fs";
import * as glob from "glob";
import load from "load-json-file";
import * as path from "path";
import * as sharedstreetsPbf from "sharedstreets-pbf";
import { SharedStreetsGeometry } from "sharedstreets-types";
import test from "tape";
import write from "write-json-file";
import * as sharedstreetsGeoJSON from "./";

// Convert PBF to JSON if does not exist
glob.sync(path.join(__dirname, "test", "in", "*.pbf")).forEach((filepath) => {
  const { name } = path.parse(filepath);
  const ext = path.parse(name).ext.replace("\.", "");
  const filepathjson = filepath.replace(".pbf", ".json");
  if (!fs.existsSync(filepathjson)) {
    const buffer = fs.readFileSync(filepath);
    const parser: any = sharedstreetsPbf;
    const data = parser[ext](buffer);
    write.sync(filepathjson, data);
  }
});

test("sharedstreets-geojson -- geometry", (t) => {
  glob.sync(path.join(__dirname, "test", "in", "*.geometry.json")).forEach((filepath) => {
    // Load JSON Data
    const { name } = path.parse(filepath);
    const data: SharedStreetsGeometry[] = load.sync(filepath);

    // Convert JSON to GeoJSON
    const geojson = featureCollection(data.map((geom) => sharedstreetsGeoJSON.geometry(geom)));

    // Save GeoJSON
    const outpath = filepath.replace(path.join("test", "in"), path.join("test", "out")).replace(".json", ".geojson");
    if (process.env.REGEN) { write.sync(outpath, geojson); }
    t.deepEqual(geojson, load.sync(outpath));
  });
  t.end();
});
