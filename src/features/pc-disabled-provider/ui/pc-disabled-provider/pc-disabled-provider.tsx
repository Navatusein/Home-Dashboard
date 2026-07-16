"use client"

import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {ReactNode} from "react";

type Props = {
  children: ReactNode;
}

export default function PcDisabledProvider(props: Props) {
  const isAgentOff = useEntityOff("binary_sensor.navatusein_pc_pc_running");

  return (
    <DisabledContext.Provider value={isAgentOff}>
      {props.children}
    </DisabledContext.Provider>
  )
}
