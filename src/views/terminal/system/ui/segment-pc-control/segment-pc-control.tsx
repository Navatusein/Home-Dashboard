"use client"

import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {PcDisabledProvider} from "@/features/pc-disabled-provider";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import PowerIcon from "@public/icons/devices-and-networks/power.svg";
import LogoutIcon from "@public/icons/devices-and-networks/logout.svg";
import ReloadIcon from "@public/icons/devices-and-networks/reload.svg";
import DeviceLaptopIcon from "@public/icons/devices-and-networks/device-laptop.svg";
import DeviceLaptopOffIcon from "@public/icons/devices-and-networks/device-laptop-off.svg";

export default function SegmentPcControl() {
  return (
    <>
      <AgentDisabledProvider>
        <Grid.Section rowStart={7} colStart={1} direction="horizontal">
          <ButtonButton entity="button.navatusein_pc_lock_pc" icon={LogoutIcon}/>
        </Grid.Section>
      </AgentDisabledProvider>

      <PcDisabledProvider>
        <Grid.Section rowStart={7} colStart={2} direction="horizontal">
          <ButtonButton entity="button.navatusein_pc_shutdown_pc" icon={PowerIcon}/>
          <ButtonButton entity="button.navatusein_pc_restart_pc" icon={ReloadIcon}/>
        </Grid.Section>
      </PcDisabledProvider>

      <Grid.Section rowStart={7} colStart={5} direction="horizontal">
        <ToggleButton
          entity="switch.laptop_nas_wr01b"
          iconEnabled={DeviceLaptopIcon}
          iconDisabled={DeviceLaptopOffIcon}
          colorEnabled="blue"
          title="Power"
        />
      </Grid.Section>
    </>
  )
}
