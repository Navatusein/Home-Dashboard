"use client"

import {isOffState, useEntity} from "@hakit/core";
import {mdiMicrophone, mdiMicrophoneOff} from "@mdi/js";
import {Chips} from "@/shared/ui-kit/chips";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

export default function DiscordMuteChip() {
  const muteEntity = useEntity("switch.navatusein_pc_discord_mute");
  const isNotInVoice = useEntityOff("binary_sensor.navatusein_pc_discord_voice_channel");

  const isMicOn = isOffState(muteEntity.state);

  if (isNotInVoice)
    return null;

  return (
    <Chips
      text="Discord"
      icon={isMicOn ? mdiMicrophone : mdiMicrophoneOff}
      iconColor={isMicOn ? "green" : "red"}
      clickable
      onClick={() => muteEntity.service.toggle()}
    />
  )
}
