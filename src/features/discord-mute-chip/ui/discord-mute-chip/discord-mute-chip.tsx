"use client"

import {isOffState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {mdiMicrophone, mdiMicrophoneOff} from "@mdi/js";
import {Chips} from "@/shared/ui-kit/chips";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {useDiscordDevice} from "@/shared/hooks/use-discord-device";

export default function DiscordMuteChip() {
  const {device} = useDiscordDevice();

  const muteEntity = useEntity(device.discordMute);
  const isNotInVoice = useEntityOff(device.discordVoiceChannel);

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
