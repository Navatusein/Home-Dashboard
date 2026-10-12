"use client"

import {useEffect, useState} from "react";
import {useEntity, useHass} from "@hakit/core";
import clsx from "clsx";
import styles from "./valetudo-map.module.scss";
import {EntityNameCamera} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";
import {ValetudoMapData} from "../../types/types";
import {extractMapData} from "../../helpers/extract-map-data";
import {buildLayerPath} from "../../helpers/build-layer-path";

const POLL_INTERVAL = 5000;
const VIEW_BOX_MARGIN = 2;
const POINT_RADIUS = 17;
const ORDER_BADGE_SIZE = 16;
const SEGMENT_COLORS: ColorToken[] = ["blue", "teal", "purple", "yellow", "orange", "pink", "green", "red"];

type Props = {
  entity: EntityNameCamera;
  selectedSegments?: string[];
  onSegmentClick?: (segmentId: string) => void;
}

export default function ValetudoMap(props: Props) {
  const picture = useEntity(props.entity).attributes.entity_picture;
  const hassUrl = useHass((state) => state.hassUrl);

  const [map, setMap] = useState<ValetudoMapData>();

  useEffect(() => {
    if (!picture || !hassUrl)
      return;

    const load = async () => {
      try {
        const response = await fetch(new URL(picture, hassUrl));

        setMap(await extractMapData(await response.arrayBuffer()));
      }
      catch (error) {
        console.warn(error);
      }
    }

    load();

    const interval = setInterval(load, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [picture, hassUrl]);

  if (!map)
    return null;

  const minX = Math.min(...map.layers.map((layer) => layer.dimensions.x.min)) - VIEW_BOX_MARGIN;
  const minY = Math.min(...map.layers.map((layer) => layer.dimensions.y.min)) - VIEW_BOX_MARGIN;
  const maxX = Math.max(...map.layers.map((layer) => layer.dimensions.x.max)) + 1 + VIEW_BOX_MARGIN;
  const maxY = Math.max(...map.layers.map((layer) => layer.dimensions.y.max)) + 1 + VIEW_BOX_MARGIN;

  const segmentIds = map.layers
    .flatMap((layer) => layer.metaData.segmentId ?? [])
    .sort((a, b) => Number(a) - Number(b));

  return (
    <svg className={styles["map"]} viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}>
      {map.layers.map((layer, index) => (
        <path
          key={index}
          className={clsx(styles[`layer-${layer.type}`], {
            [styles[`color-${SEGMENT_COLORS[segmentIds.indexOf(layer.metaData.segmentId ?? "") % SEGMENT_COLORS.length]}`]]: layer.metaData.segmentId,
            [styles["dimmed"]]: props.selectedSegments?.length && !props.selectedSegments.includes(layer.metaData.segmentId ?? ""),
          })}
          d={buildLayerPath(layer.compressedPixels)}
          onClick={() => layer.metaData.segmentId && props.onSegmentClick?.(layer.metaData.segmentId)}
        />
      ))}
      <g className={styles["entities"]} transform={`scale(${1 / map.pixelSize})`}>
        {map.entities.map((entity, index) => {
          if (entity.points.length == 2)
            return (
              <circle
                key={index}
                className={styles[`entity-${entity.type}`]}
                cx={entity.points[0]}
                cy={entity.points[1]}
                r={POINT_RADIUS}
              />
            )

          if (entity.type.endsWith("path") || entity.type == "virtual_wall")
            return (
              <polyline
                key={index}
                className={styles[`entity-${entity.type}`]}
                points={entity.points.join(" ")}
              />
            )

          return (
            <polygon
              key={index}
              className={styles[`entity-${entity.type}`]}
              points={entity.points.join(" ")}
            />
          )
        })}
      </g>
      {map.layers.map((layer) => props.selectedSegments?.includes(layer.metaData.segmentId ?? "") && (
        <g key={layer.metaData.segmentId} className={styles["order"]}>
          <rect
            x={layer.dimensions.x.avg - ORDER_BADGE_SIZE / 2}
            y={layer.dimensions.y.avg - ORDER_BADGE_SIZE / 2}
            width={ORDER_BADGE_SIZE}
            height={ORDER_BADGE_SIZE}
            rx={ORDER_BADGE_SIZE / 3}
          />
          <text x={layer.dimensions.x.avg} y={layer.dimensions.y.avg}>
            {props.selectedSegments.indexOf(layer.metaData.segmentId ?? "") + 1}
          </text>
        </g>
      ))}
    </svg>
  )
}
