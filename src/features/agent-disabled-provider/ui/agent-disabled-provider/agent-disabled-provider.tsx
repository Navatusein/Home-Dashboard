"use client"

import {ReactNode} from "react";
import {EntityNameBinarySensor} from "@/shared/types/ha-domains";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

type Props = {
  children: ReactNode;
  entity?: EntityNameBinarySensor;
}

export default function AgentDisabledProvider(props: Props) {
  const isAgentOff = useEntityOff(props.entity ?? "binary_sensor.navatusein_pc_agent_running");

  return (
    <DisabledContext.Provider value={isAgentOff}>
      {props.children}
    </DisabledContext.Provider>
  )
}