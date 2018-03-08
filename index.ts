import { Feature, lineString, LineString, point, Point } from "@turf/helpers";
import { lonlatsToCoords } from "sharedstreets";
import { SharedStreetsGeometry, SharedStreetsIntersection } from "sharedstreets-types";

interface SharedStreetsGeometryGeoJSON extends Feature<LineString, SharedStreetsGeometry> {
  role: "SharedStreets:Geometry";
}

interface SharedStreetsIntersectionGeoJSON extends Feature<Point, SharedStreetsIntersection> {
  role: "SharedStreets:Intersection";
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

/**
 * Intersection
 *
 * @param {SharedStreetsIntersection} intersect JSON SharedStreetsIntersection
 * @returns {Feature<Point, SharedStreetsIntersection>} GeoJSON Point Feature SharedSteetsIntersection
 * @example
 * const pt = [110, 45];
 * const intersect = sharedstreets.intersection(pt);
 * const geojson = sharedstreetsGeoJSON.intersection(intersect)));
 * geojson // => Feature<Point, SharedStreetsIntersection>
 */
export function intersection(intersect: SharedStreetsIntersection): SharedStreetsIntersectionGeoJSON {
  const coords = [intersect.lon, intersect.lat];
  const properties = intersect;

  // Do not include (lon, lat) to GeoJSON properties
  if (properties.lon) { delete properties.lon; }
  if (properties.lat) { delete properties.lat; }

  // Add GeoJSON Foreign Member (role)
  const pt: any = point(coords, properties);
  pt.role = "SharedStreets:Intersection";
  return pt;
}
