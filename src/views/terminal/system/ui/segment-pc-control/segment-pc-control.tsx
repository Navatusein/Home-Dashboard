"use client"

import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {PcDisabledProvider} from "@/features/pc-disabled-provider";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import PowerIcon from "@public/icons/devices-and-networks/power.svg";
import LogoutIcon from "@public/icons/devices-and-networks/logout.svg";
import ReloadIcon from "@public/icons/devices-and-networks/reload.svg";
import DeviceDesktopIcon from "@public/icons/devices-and-networks/device-desktop.svg"
import DeviceDesktopOffIcon from "@public/icons/devices-and-networks/device-desktop-off.svg"
import RobotIcon from "@public/icons/streaming-and-socials/robot.svg";
import RobotOffIcon from "@public/icons/streaming-and-socials/robot-off.svg";
import LockIcon from "@public/icons/home-automation-and-buildings/lock.svg"
import LockOpenIcon from "@public/icons/home-automation-and-buildings/lock-open.svg"

export default function SegmentPcControl() {
  const isUserSessionUnlocked = !useEntityOff("binary_sensor.navatusein_pc_user_session");
  const isPcRunning = !useEntityOff("binary_sensor.navatusein_pc_pc_running");
  const isAgentRunning = !useEntityOff("binary_sensor.navatusein_pc_agent_running");

  return (
    <>
      <Grid.Section rowStart={6} colStart={1} direction="horizontal">
        <BaseButton
          title="Session"
          icon={isUserSessionUnlocked ? LockOpenIcon : LockIcon}
          color={isUserSessionUnlocked ? "blue" : "default"}
        />
        <BaseButton
          title="Desktop"
          icon={isPcRunning ? DeviceDesktopIcon : DeviceDesktopOffIcon}
          color={isPcRunning ? "blue" : "default"}
        />
        <BaseButton
          title="Agent"
          icon={isAgentRunning ? RobotIcon : RobotOffIcon}
          color={isAgentRunning ? "blue" : "default"}
        />
      </Grid.Section>

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
    </>
  )
}
