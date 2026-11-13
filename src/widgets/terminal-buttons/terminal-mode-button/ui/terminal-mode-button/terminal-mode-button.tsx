"use client"

import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {useState} from "react";
import {TerminalModal} from "@/features/terminal-modal";
import {Grid} from "@/shared/ui-kit";
import {useTerminalDevice} from "@/shared/hooks/use-terminal-device";
import {TERMINAL_DEVICES, TERMINAL_MODES, TerminalMode} from "@/shared/constants/terminal-devices";
import LayoutDashboardIcon from "@public/icons/software-editors-and-uI/layout-dashboard.svg";

type Props = BaseButtonSharedProps

export default function TerminalModeButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const terminalDevice = useTerminalDevice();

  const selectMode = (mode: TerminalMode) => {
    terminalDevice.setMode(mode);
    setIsModalOpen(false);
  }

  return (
    <>
      <BaseButton
        {...props}
        title={terminalDevice.device.title}
        icon={LayoutDashboardIcon}
        onClickAction={() => setIsModalOpen(true)}
      />
      <TerminalModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Grid.Section rowStart={2} colStart={11} direction="vertical">
          {TERMINAL_MODES.map((mode) => (
            <BaseButton
              key={mode}
              title={TERMINAL_DEVICES[mode].title}
              icon={TERMINAL_DEVICES[mode].icon}
              color={terminalDevice.mode == mode ? "blue" : "default"}
              onClickAction={() => selectMode(mode)}
            />
          ))}
        </Grid.Section>
      </TerminalModal>
    </>
  )
}
