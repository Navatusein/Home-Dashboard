"use client"

import {useEffect, useRef} from "react";
import {useMap} from "react-leaflet";
import {DomEvent, LatLngTuple} from "leaflet";
import {mdiArrowExpand, mdiFitToScreenOutline, mdiMapMarkerRadius, mdiMinus, mdiPlus} from "@mdi/js";
import {Button, Flex} from "@/shared/ui-kit";
import {fitPoints} from "../../helpers/fit-points";
import styles from "./map-controls.module.scss";

type Props = {
  points: LatLngTuple[];
  zonesShown: boolean;
  onZonesToggle: () => void;
  onExpand?: () => void;
}

export default function MapControls(props: Props) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current)
      return;

    DomEvent.disableClickPropagation(containerRef.current);
    DomEvent.disableScrollPropagation(containerRef.current);
  }, []);

  return (
    <Flex
      ref={containerRef}
      vertical
      gap="xs"
      className={styles["controls"]}
    >
      <Button
        shape="round"
        icon={mdiPlus}
        onClick={() => map.zoomIn()}
      />
      <Button
        shape="round"
        icon={mdiMinus}
        onClick={() => map.zoomOut()}
      />
      <Button
        shape="round"
        icon={mdiMapMarkerRadius}
        color={props.zonesShown ? "green" : "default"}
        onClick={props.onZonesToggle}
      />
      <Button
        shape="round"
        icon={mdiFitToScreenOutline}
        onClick={() => fitPoints(map, props.points)}
      />
      {props.onExpand && (
        <Button
          shape="round"
          icon={mdiArrowExpand}
          onClick={props.onExpand}
        />
      )}
    </Flex>
  )
}
