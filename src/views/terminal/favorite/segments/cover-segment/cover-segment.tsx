"use client"

import {Grid} from "@/shared/ui-kit";
import {useEntity} from "@hakit/core";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import ArrowBarToUpIcon from "@public/icons/symbols/arrow-bar-to-up.svg";
import ArrowBarToDownIcon from "@public/icons/symbols/arrow-bar-to-down.svg";
import PlayerStopIcon from "@public/icons/media/player-stop.svg";

export default function CoverSegment() {
  const cover = useEntity("cover.small_bedroom_am43");

  const isOpen = cover.state == "open" || cover.state == "opening";
  const isClosed = cover.state == "closed" || cover.state == "closing";

  return (
    <Grid.Section rowStart={2} colStart={12} direction="vertical">
      <BaseButton
        title="Open"
        icon={ArrowBarToUpIcon}
        color={isOpen ? "blue" : "default"}
        onClickAction={() => cover.service.openCover()}
      />
      <BaseButton
        title="Stop"
        icon={PlayerStopIcon}
        onClickAction={() => cover.service.stopCover()}
      />
      <BaseButton
        title="Close"
        icon={ArrowBarToDownIcon}
        color={isClosed ? "blue" : "default"}
        onClickAction={() => cover.service.closeCover()}
      />
    </Grid.Section>
  )
}
