"use client"

import {Circle, MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import {divIcon, LatLngTuple, Map as LeafletInstance, Marker as LeafletMarker} from "leaflet";
import {Fragment, useEffect, useRef, useState} from "react";
import {LeafletMapMarker, LeafletMapZone} from "../../types/types";
import {MAX_ZOOM} from "../../helpers/fit-points";
import FitBounds from "../fit-bounds/fit-bounds";
import MapControls from "../map-controls/map-controls";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import {Chips} from "@/shared/ui-kit/chips";
import {mdiMapMarkerRadius} from "@mdi/js";
import styles from "./leaflet-map.module.scss";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type Props = {
  center: LatLngTuple;
  markers: LeafletMapMarker[];
  zones: LeafletMapZone[];
  focus?: {key: string};
  onExpand?: () => void;
}

const MARKER_SIZE = 40;
const MARKER_GAP = 4;
const POPUP_WIDTH = 240;
const METERS_PER_DEGREE = 111_320;

export default function LeafletMap(props: Props) {
  const [map, setMap] = useState<LeafletInstance | null>(null);
  const markerRefs = useRef<Record<string, LeafletMarker>>({});
  const [zonesShown, setZonesShown] = useLocalStorage("map-zones-shown", false);
  const points: LatLngTuple[] = [props.center, ...props.markers.map((marker) => marker.position)];

  useEffect(() => {
    const marker = props.focus && markerRefs.current[props.focus.key];

    if (!map || !marker)
      return;

    map.flyTo(marker.getLatLng(), MAX_ZOOM);
    marker.openPopup();
  }, [map, props.focus]);

  const getOffset = (marker: LeafletMapMarker) => {
    const group = props.markers.filter((other) => other.position.join() == marker.position.join());

    return (group.indexOf(marker) - (group.length - 1) / 2) * (MARKER_SIZE + MARKER_GAP);
  }

  return (
    <MapContainer
      ref={setMap}
      attributionControl={false}
      center={props.center}
      zoom={MAX_ZOOM}
      maxZoom={MAX_ZOOM}
      zoomControl={false}
      scrollWheelZoom={true}
      className={styles["map-container"]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={MAX_ZOOM}
      />
      <FitBounds
        key={props.markers.map((marker) => marker.key).join()}
        points={points}
      />
      <MapControls
        points={points}
        zonesShown={zonesShown}
        onZonesToggle={() => setZonesShown((value) => !value)}
        onExpand={props.onExpand}
      />
      {zonesShown && props.zones.map((zone) => (
        <Fragment key={zone.key}>
          <Circle
            center={zone.position}
            radius={zone.radius}
            interactive={false}
            pathOptions={{className: styles["zone"]}}
          />
          <Marker
            position={[zone.position[0] + zone.radius / METERS_PER_DEGREE, zone.position[1]]}
            icon={divIcon({className: "", iconSize: [0, 0]})}
            interactive={false}
            keyboard={false}
          >
            <Tooltip
              permanent
              direction="center"
              pane="shadowPane"
              className={styles["zone-label"]}
            >
              <Chips
                text={zone.title}
                icon={mdiMapMarkerRadius}
                iconColor="green"
                className={styles["zone-chip"]}
              />
            </Tooltip>
          </Marker>
        </Fragment>
      ))}
      {props.markers.map((marker) => (
        <Fragment key={marker.key}>
          {marker.accuracy != null && (
            <Circle
              center={marker.position}
              radius={marker.accuracy}
              interactive={false}
              pathOptions={{className: styles["accuracy"]}}
            />
          )}
          <Marker
            ref={(ref) => {
              if (ref)
                markerRefs.current[marker.key] = ref;
            }}
            position={marker.position}
            icon={divIcon({
              html: `<img src="${marker.imageUrl}" alt=""/>`,
              className: styles["marker"],
              iconSize: [MARKER_SIZE, MARKER_SIZE],
              iconAnchor: [MARKER_SIZE / 2 - getOffset(marker), MARKER_SIZE / 2],
              popupAnchor: [getOffset(marker), -MARKER_SIZE / 2],
            })}
          >
            <Popup
              closeButton={false}
              minWidth={POPUP_WIDTH}
              maxWidth={POPUP_WIDTH}
            >
              {marker.popup}
            </Popup>
          </Marker>
        </Fragment>
      ))}
    </MapContainer>
  )
}
