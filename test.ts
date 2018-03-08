import * as fs from "fs";
import * as glob from "glob";
import load from "load-json-file";
import * as path from "path";
import * as sharedstreetsPbf from "sharedstreets-pbf";
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
