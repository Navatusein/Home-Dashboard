"use client";

import {useEntity} from "@/shared/hooks/use-entity";
import {TERMINAL_DEVICES, TERMINAL_MODES, TerminalMode} from "@/shared/constants/terminal-devices";

export function useTerminalDevice() {
  const modeEntity = useEntity("input_select.terminal_mode");

  const mode = TERMINAL_MODES.includes(modeEntity.state as TerminalMode) ? modeEntity.state as TerminalMode : "pc";

  return {
    mode: mode,
    device: TERMINAL_DEVICES[mode],
    setMode: (option: TerminalMode) => modeEntity.service.selectOption({serviceData: {option: option}}),
  };
}
