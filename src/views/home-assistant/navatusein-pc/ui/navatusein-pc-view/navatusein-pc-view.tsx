"use client"

import {BootstrapGrid, Flex} from "@/shared/ui-kit";
import {useUser} from "@hakit/core";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import PowerSegment from "../../segments/power-segment/power-segment";
import SoundSegment from "../../segments/sound-segment/sound-segment";
import MediaSegment from "../../segments/media-segment/media-segment";
import DiscordSegment from "../../segments/discord-segment/discord-segment";
import AppsSegment from "../../segments/apps-segment/apps-segment";
import TerminalSegment from "../../segments/terminal-segment/terminal-segment";

export default function NavatuseinPcView() {
  const isOwner = useUser()?.name == "Bohdan";

  if (!isOwner)
    return null;

  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <InfoCard/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <Flex vertical gap="sm">
            <PowerSegment/>
            <DiscordSegment/>
          </Flex>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <Flex vertical gap="sm">
            <TerminalSegment/>
            <SoundSegment/>
            <MediaSegment/>
          </Flex>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <AppsSegment/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
    </Flex>
  )
}
