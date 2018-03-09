import { Feature, featureCollection, FeatureCollection, lineString, LineString, point, Point } from "@turf/helpers";
import { lonlatsToCoords } from "sharedstreets";
import { SharedStreetsGeometry, SharedStreetsIntersection, SharedStreetsReference } from "sharedstreets-types";

interface SharedStreetsGeometryGeoJSON extends Feature<LineString, SharedStreetsGeometry> {
  role: "SharedStreets:Geometry";
}

interface SharedStreetsIntersectionGeoJSON extends Feature<Point, SharedStreetsIntersection> {
  role: "SharedStreets:Intersection";
}

interface SharedStreetsReferenceGeoJSON extends SharedStreetsReference {
  role: "SharedStreets:Reference";
}

interface SharedStreetsGeoJSON extends FeatureCollection {
  references: SharedStreetsReferenceGeoJSON[];
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

/**
 * Reference
 *
 * @param {SharedStreetsReference} intersect JSON SharedStreetsReference
 * @returns {SharedStreetsReference} SharedSteetsIntersection with Role
 */
export function reference(ref: SharedStreetsReference): SharedStreetsReferenceGeoJSON {
  const data: any = ref;
  data.role = "SharedStreets:Reference";
  return data;
}

/**
 * GeoJSON
 *
 * @param {Array<SharedStreetsGeometry>} geometries An Array of SharedStreetsGeometry
 * @param {Array<SharedStreetsIntersection>} intersections An Array of SharedStreetsIntersection
 * @param {Array<SharedStreetsReference>} references An Array of SharedStreetsReference
 * @returns {FeatureCollection} SharedStreets GeoJSON
 */
export function geojson(
  geometries: SharedStreetsGeometry[],
  intersections: SharedStreetsIntersection[],
  references: SharedStreetsReference[],
): SharedStreetsGeoJSON {
  const data: any = featureCollection([]);

  geometries.forEach((item) => data.features.push(geometry(item)));
  intersections.forEach((item) => data.features.push(intersection(item)));
  references.forEach((item) => data.references.push(reference(item)));
  return data;
}
