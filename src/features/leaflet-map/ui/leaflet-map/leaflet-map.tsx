"use client"

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {divIcon, LatLngTuple} from "leaflet";
import {LeafletMapMarker} from "../../types/types";
import FitBounds from "../fit-bounds/fit-bounds";
import styles from "./leaflet-map.module.scss";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type Props = {
  center: LatLngTuple;
  markers: LeafletMapMarker[];
}

const MARKER_SIZE = 40;
const MARKER_GAP = 4;

export default function LeafletMap(props: Props) {
  const getOffset = (marker: LeafletMapMarker) => {
    const group = props.markers.filter((other) => other.position.join() == marker.position.join());

    return (group.indexOf(marker) - (group.length - 1) / 2) * (MARKER_SIZE + MARKER_GAP);
  }

  return (
    <MapContainer
      attributionControl={false}
      center={props.center}
      zoom={19}
      scrollWheelZoom={true}
      className={styles["map-container"]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={[props.center, ...props.markers.map((marker) => marker.position)]}/>
      {props.markers.map((marker) => (
        <Marker
          key={marker.key}
          position={marker.position}
          icon={divIcon({
            html: `<img src="${marker.imageUrl}" alt=""/>`,
            className: styles["marker"],
            iconSize: [MARKER_SIZE, MARKER_SIZE],
            iconAnchor: [MARKER_SIZE / 2 - getOffset(marker), MARKER_SIZE / 2],
            popupAnchor: [getOffset(marker), -MARKER_SIZE / 2],
          })}
        >
          <Popup closeButton={false}>
            <b>{marker.title}</b>
            <br/>
            {marker.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
