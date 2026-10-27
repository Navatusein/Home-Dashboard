"use client"

import {useEffect, useState} from "react";
import {useMap} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import {fitPoints} from "../../helpers/fit-points";

type Props = {
  points: LatLngTuple[];
}

export default function FitBounds(props: Props) {
  const map = useMap();
  const [points] = useState(props.points);

  useEffect(() => {
    fitPoints(map, points);
  }, [map, points]);

  return null;
}
