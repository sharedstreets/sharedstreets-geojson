import { Feature, lineString, LineString } from "@turf/helpers";
import { lonlatsToCoords } from "sharedstreets";
import { SharedStreetsGeometry } from "sharedstreets-types";

interface SharedStreetsGeometryGeoJSON extends Feature<LineString, SharedStreetsGeometry> {
  role: "SharedStreets:Geometry";
}

/**
 * Geometry
 *
 * @param {SharedStreetsGeometry} geom JSON SharedStreetsGeometry
 * @returns {Feature<LineString, SharedStreetsGeometry>} GeoJSON LineString Feature SharedSteetsGeometry
 * @example
 * const line = [[110, 45], [115, 50], [120, 55]];
 * const geom = sharedstreets.geometry(line);
 * const geojson = sharedstreetsGeoJSON.geometry(geom)));
 * geojson // => Feature<LineString, SharedStreetsGeometry>
 */
export function geometry(geom: SharedStreetsGeometry): SharedStreetsGeometryGeoJSON {
  const coords = lonlatsToCoords(geom.lonlats);
  const properties = geom;

  // Do not include (lonlats) to GeoJSON properties
  if (properties.lonlats) { delete properties.lonlats; }

  // Add GeoJSON Foreign Member (role)
  const line: any = lineString(coords, properties);
  line.role = "SharedStreets:Geometry";
  return line;
}
