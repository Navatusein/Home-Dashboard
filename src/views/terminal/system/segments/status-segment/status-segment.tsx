"use client"

import {Grid} from "@/shared/ui-kit";
import {ChargedButton} from "@/widgets/terminal-buttons/charged-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

export default function StatusSegment() {
  return (
    <>
      <AgentDisabledProvider>
        <Grid.Section rowStart={2} colStart={1} direction="horizontal">
          <ChargedButton
            title="Mouse"
            chargeSensor="sensor.navatusein_pc_g_pro_mouse_battery"
            isChargingBinarySensor="binary_sensor.navatusein_pc_g_pro_mouse_charging"
          />
        </Grid.Section>
      </AgentDisabledProvider>
    </>
  )
}
