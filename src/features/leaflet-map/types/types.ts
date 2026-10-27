import {LatLngTuple} from "leaflet";
import {ReactNode} from "react";

export type LeafletMapMarker = {
  key: string;
  position: LatLngTuple;
  imageUrl: string;
  popup: ReactNode;
  accuracy?: number;
}

export type LeafletMapZone = {
  key: string;
  position: LatLngTuple;
  radius: number;
  title: string;
}
