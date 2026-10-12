"use client"

import {useEffect} from "react";
import {useMap} from "react-leaflet";
import {LatLngTuple} from "leaflet";

type Props = {
  points: LatLngTuple[];
}

const MAX_ZOOM = 19;
const PADDING = 40;

export default function FitBounds(props: Props) {
  const map = useMap();
  const points = JSON.stringify(props.points);

  useEffect(() => {
    map.fitBounds(JSON.parse(points), {maxZoom: MAX_ZOOM, padding: [PADDING, PADDING]});
  }, [map, points]);

  return null;
}
