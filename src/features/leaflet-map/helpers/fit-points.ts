import {LatLngTuple, Map} from "leaflet";

export const MAX_ZOOM = 19;

const PADDING = 40;

export function fitPoints(map: Map, points: LatLngTuple[]) {
  map.fitBounds(points, {maxZoom: MAX_ZOOM, padding: [PADDING, PADDING]});
}
