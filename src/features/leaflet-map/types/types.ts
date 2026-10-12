import {LatLngTuple} from "leaflet";

export type LeafletMapMarker = {
  key: string;
  position: LatLngTuple;
  imageUrl: string;
  title: string;
  description: string;
}
