"use client"

import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {ReactNode} from "react";
import {EntityNameBinarySensor} from "@/shared/types/ha-domains";

type Props = {
  children: ReactNode;
  entity?: EntityNameBinarySensor;
}

export default function PcDisabledProvider(props: Props) {
  const isAgentOff = useEntityOff(props.entity ?? "binary_sensor.navatusein_pc_pc_running");

  return (
    <DisabledContext.Provider value={isAgentOff}>
      {props.children}
    </DisabledContext.Provider>
  )
}
