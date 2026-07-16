"use client"

import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {PcDisabledProvider} from "@/features/pc-disabled-provider";
import PowerIcon from "@public/icons/devices-and-networks/power.svg";
import LogoutIcon from "@public/icons/devices-and-networks/logout.svg";
import ReloadIcon from "@public/icons/devices-and-networks/reload.svg";

export default function SegmentPcControl() {
  return (
    <>
      <AgentDisabledProvider>
        <Grid.Section rowStart={7} colStart={1} direction="horizontal">
          <ButtonButton entity="button.navatusein_pc_shutdown_pc" icon={LogoutIcon}/>
        </Grid.Section>
      </AgentDisabledProvider>

      <PcDisabledProvider>
        <Grid.Section rowStart={7} colStart={2} direction="horizontal">
          <ButtonButton entity="button.navatusein_pc_shutdown_pc" icon={PowerIcon}/>
          <ButtonButton entity="button.navatusein_pc_restart_pc" icon={ReloadIcon}/>
        </Grid.Section>
      </PcDisabledProvider>
    </>
  )
}
