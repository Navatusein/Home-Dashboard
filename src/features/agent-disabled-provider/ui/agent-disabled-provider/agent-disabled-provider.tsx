"use client"

import {ReactNode} from "react";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

type Props = {
  children: ReactNode;
}

export default function AgentDisabledProvider(props: Props) {
  const isAgentOff = useEntityOff("binary_sensor.navatusein_pc_agent_running");

  return (
    <DisabledContext.Provider value={isAgentOff}>
      {props.children}
    </DisabledContext.Provider>
  )
}