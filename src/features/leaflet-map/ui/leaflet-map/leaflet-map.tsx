"use client"

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {LatLngExpression, LatLngTuple} from "leaflet";
import styles from "./leaflet-map.module.scss";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type Props = {
  center: LatLngExpression | LatLngTuple;
  posix: LatLngExpression | LatLngTuple;
}

export default function LeafletMap(props: Props) {
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
      <Marker position={props.posix} draggable={false}>
        <Popup>Hey, I’m a popup!</Popup>
      </Marker>
    </MapContainer>
  )
}
