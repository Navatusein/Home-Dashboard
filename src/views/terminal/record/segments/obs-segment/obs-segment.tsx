"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import LinkIcon from "@public/icons/software-editors-and-uI/link.svg";
import LinkOffIcon from "@public/icons/software-editors-and-uI/link-off.svg";
import CaptureIcon from "@public/icons/streaming-and-socials/capture.svg";
import CaptureOffIcon from "@public/icons/streaming-and-socials/capture-off.svg";

export default function ObsSegment() {
  const isObsDisconnected = useEntityOff("binary_sensor.navatusein_pc_obs_plugin_status");

  return (
    <>
      <AgentDisabledProvider>
        <Grid.Section rowStart={2} colStart={1} direction="vertical">
          <ButtonButton entity="button.navatusein_pc_launch_obs" image="/applications/OBS.png"/>
        </Grid.Section>
      </AgentDisabledProvider>

      <Grid.Section rowStart={3} colStart={1} direction="vertical">
        <BaseButton
          title="OBS"
          icon={isObsDisconnected ? LinkOffIcon : LinkIcon}
          color={isObsDisconnected ? "default" : "blue"}
        />
      </Grid.Section>

      <DisabledContext.Provider value={isObsDisconnected}>
        <Grid.Section rowStart={7} colStart={1} direction="vertical">
          <ToggleButton
            entity="switch.navatusein_pc_obs_recording"
            title="Record"
            iconEnabled={CaptureIcon}
            iconDisabled={CaptureOffIcon}
            colorEnabled="red"
          />
        </Grid.Section>
      </DisabledContext.Provider>
    </>
  )
}
