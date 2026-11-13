"use client"

import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {useState} from "react";
import {TerminalModal} from "@/features/terminal-modal";
import {Grid} from "@/shared/ui-kit";
import {DiscordMode, useDiscordDevice} from "@/shared/hooks/use-discord-device";
import {TERMINAL_DEVICES, TERMINAL_MODES} from "@/shared/constants/terminal-devices";
import BrandDiscordIcon from "@public/icons/brands/brand-discord.svg";
import WandIcon from "@public/icons/software-editors-and-uI/wand.svg";

type Props = BaseButtonSharedProps

export default function DiscordModeButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discordDevice = useDiscordDevice();

  const selectMode = (mode: DiscordMode) => {
    discordDevice.setDiscordMode(mode);
    setIsModalOpen(false);
  }

  return (
    <>
      <BaseButton
        {...props}
        title={discordDevice.device.title}
        icon={BrandDiscordIcon}
        onClickAction={() => setIsModalOpen(true)}
      />
      <TerminalModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Grid.Section rowStart={2} colStart={12} direction="vertical">
          <BaseButton
            title="Auto"
            icon={WandIcon}
            color={discordDevice.discordMode == "auto" ? "blue" : "default"}
            onClickAction={() => selectMode("auto")}
          />
          {TERMINAL_MODES.map((mode) => (
            <BaseButton
              key={mode}
              title={TERMINAL_DEVICES[mode].title}
              icon={TERMINAL_DEVICES[mode].icon}
              color={discordDevice.discordMode == mode ? "blue" : "default"}
              onClickAction={() => selectMode(mode)}
            />
          ))}
        </Grid.Section>
      </TerminalModal>
    </>
  )
}
