# SharedStreets GeoJSON

[![npm version](https://badge.fury.io/js/sharedstreets-geojson.svg)](https://badge.fury.io/js/sharedstreets-geojson)
[![Build Status](https://travis-ci.org/sharedstreets/sharedstreets-geojson.svg?branch=master)](https://travis-ci.org/sharedstreets/sharedstreets-geojson)

Converts SharedStreets JSON to GeoJSON.

## Install

**In Node.js**

```bash
$ yarn add sharedstreets-geojson
```

**CommonJS**

```js
const sharedstreetsGeoJSON = require('sharedstreets-geojson');
```

**Typescript**

```js
import * as sharedstreetsGeoJSON from 'sharedstreets-geojson';
```

## In Browser

For a full list of web examples, check out [SharedStreets examples](https://github.com/sharedstreets/sharedstreets-examples).

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [geometry](#geometry)
-   [intersection](#intersection)

### geometry

Geometry

**Parameters**

-   `geom` **SharedStreetsGeometry** JSON SharedStreetsGeometry

**Examples**

```javascript
const line = [[110, 45], [115, 50], [120, 55]];
const geom = sharedstreets.geometry(line);
const geojson = sharedstreetsGeoJSON.geometry(geom)));
geojson // => Feature<LineString, SharedStreetsGeometry>
```

Returns **Feature&lt;LineString, SharedStreetsGeometry>** GeoJSON LineString Feature SharedSteetsGeometry

### intersection

Intersection

**Parameters**

-   `intersect` **SharedStreetsIntersection** JSON SharedStreetsIntersection

**Examples**

```javascript
const pt = [110, 45];
const intersect = sharedstreets.intersection(pt);
const geojson = sharedstreetsGeoJSON.intersection(intersect)));
geojson // => Feature<Point, SharedStreetsIntersection>
```

Returns **Feature&lt;Point, SharedStreetsIntersection>** GeoJSON Point Feature SharedSteetsIntersection
