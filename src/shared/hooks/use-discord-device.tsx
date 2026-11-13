"use client";

import useLocalStorage from "@/shared/hooks/use-local-storage";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {useTerminalDevice} from "@/shared/hooks/use-terminal-device";
import {TERMINAL_DEVICES, TERMINAL_MODES, TerminalMode} from "@/shared/constants/terminal-devices";

export type DiscordMode = "auto" | TerminalMode;

export function useDiscordDevice() {
  const {mode} = useTerminalDevice();
  const [discordMode, setDiscordMode] = useLocalStorage<DiscordMode>("discord-mode", "auto");

  const isInVoiceChannel = {
    pc: !useEntityOff(TERMINAL_DEVICES.pc.discordVoiceChannel),
    laptop: !useEntityOff(TERMINAL_DEVICES.laptop.discordVoiceChannel),
    mac: !useEntityOff(TERMINAL_DEVICES.mac.discordVoiceChannel),
  };

  const autoMode = isInVoiceChannel[mode] ? mode : TERMINAL_MODES.find((item) => isInVoiceChannel[item]) ?? mode;
  const deviceMode = TERMINAL_MODES.includes(discordMode as TerminalMode) ? discordMode as TerminalMode : autoMode;

  return {
    discordMode: discordMode,
    device: TERMINAL_DEVICES[deviceMode],
    setDiscordMode: setDiscordMode,
  };
}
