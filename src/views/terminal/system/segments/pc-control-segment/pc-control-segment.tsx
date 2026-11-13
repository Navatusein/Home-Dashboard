"use client"

import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {PcDisabledProvider} from "@/features/pc-disabled-provider";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import PowerIcon from "@public/icons/devices-and-networks/power.svg";
import LogoutIcon from "@public/icons/devices-and-networks/logout.svg";
import ReloadIcon from "@public/icons/devices-and-networks/reload.svg";
import DeviceLaptopIcon from "@public/icons/devices-and-networks/device-laptop.svg";
import DeviceLaptopOffIcon from "@public/icons/devices-and-networks/device-laptop-off.svg";
import DevicesPcIcon from "@public/icons/devices-and-networks/devices-pc.svg";
import DevicesPcOffIcon from "@public/icons/devices-and-networks/devices-pc-off.svg";
import DeviceDesktopIcon from "@public/icons/devices-and-networks/device-desktop.svg";
import DeviceDesktopOffIcon from "@public/icons/devices-and-networks/device-desktop-off.svg";
import BrandAppleIcon from "@public/icons/brands/brand-apple.svg";

export default function PcControlSegment() {
  const isMacbookRunning = !useEntityOff("binary_sensor.navatusein_macbook_agent_running");
  const isMacbookUnlocked = !useEntityOff("binary_sensor.navatusein_macbook_user_session");
  const isLaptopRunning = !useEntityOff("binary_sensor.navatusein_work_laptop_pc_running");
  const isLaptopUnlocked = !useEntityOff("binary_sensor.navatusein_work_laptop_user_session");
  const isPcRunning = !useEntityOff("binary_sensor.navatusein_pc_pc_running");
  const isPcUnlocked = !useEntityOff("binary_sensor.navatusein_pc_user_session");

  return (
    <>
      <AgentDisabledProvider entity="binary_sensor.navatusein_macbook_agent_running">
        <Grid.Section rowStart={5} colStart={9} direction="horizontal">
          <ButtonButton
            entity="button.navatusein_macbook_restart_mac"
            icon={ReloadIcon}
          />
          <ButtonButton
            entity="button.navatusein_macbook_shutdown_mac"
            icon={PowerIcon}
          />
          <ButtonButton
            entity="button.navatusein_macbook_lock_mac"
            icon={LogoutIcon}
            color={isMacbookUnlocked ? "blue" : "default"}
          />
        </Grid.Section>
      </AgentDisabledProvider>

      <Grid.Section rowStart={5} colStart={12} direction="horizontal">
        <BaseButton
          title="Mac"
          icon={BrandAppleIcon}
          color={isMacbookRunning ? "blue" : "default"}
        />
      </Grid.Section>

      <PcDisabledProvider entity="binary_sensor.navatusein_work_laptop_pc_running">
        <Grid.Section rowStart={6} colStart={9} direction="horizontal">
          <ButtonButton entity="button.navatusein_work_laptop_restart_pc" icon={ReloadIcon}/>
          <ButtonButton entity="button.navatusein_work_laptop_shutdown_pc" icon={PowerIcon}/>
        </Grid.Section>
      </PcDisabledProvider>

      <AgentDisabledProvider entity="binary_sensor.navatusein_work_laptop_agent_running">
        <Grid.Section rowStart={6} colStart={11} direction="horizontal">
          <ButtonButton
            entity="button.navatusein_work_laptop_lock_pc"
            icon={LogoutIcon}
            color={isLaptopUnlocked ? "blue" : "default"}
          />
        </Grid.Section>
      </AgentDisabledProvider>

      <Grid.Section rowStart={6} colStart={12} direction="horizontal">
        <BaseButton
          title="Laptop"
          icon={DeviceLaptopIcon}
          color={isLaptopRunning ? "blue" : "default"}
        />
      </Grid.Section>

      <PcDisabledProvider>
        <Grid.Section rowStart={7} colStart={9} direction="horizontal">
          <ButtonButton entity="button.navatusein_pc_restart_pc" icon={ReloadIcon}/>
          <ButtonButton entity="button.navatusein_pc_shutdown_pc" icon={PowerIcon}/>
        </Grid.Section>
      </PcDisabledProvider>

      <AgentDisabledProvider>
        <Grid.Section rowStart={7} colStart={11} direction="horizontal">
          <ButtonButton
            entity="button.navatusein_pc_lock_pc"
            icon={LogoutIcon}
            color={isPcUnlocked ? "blue" : "default"}
          />
        </Grid.Section>
      </AgentDisabledProvider>

      <Grid.Section rowStart={7} colStart={12} direction="horizontal">
        <BaseButton
          title="PC"
          icon={DevicesPcIcon}
          color={isPcRunning ? "blue" : "default"}
        />
      </Grid.Section>

      <Grid.Section rowStart={7} colStart={1} direction="horizontal">
        <ToggleButton
          entity="switch.laptop_nas_wr01b"
          iconEnabled={DeviceLaptopIcon}
          iconDisabled={DeviceLaptopOffIcon}
          colorEnabled="blue"
          title="Laptop"
        />
        <ToggleButton
          entity="switch.0xa4c138dd3f063ee4"
          iconEnabled={DeviceDesktopIcon}
          iconDisabled={DeviceDesktopOffIcon}
          colorEnabled="blue"
          title="Monitor"
        />
        <ToggleButton
          entity="switch.pc_nas_wr01b"
          iconEnabled={DevicesPcIcon}
          iconDisabled={DevicesPcOffIcon}
          colorEnabled="blue"
          title="PC"
        />
      </Grid.Section>
    </>
  )
}
