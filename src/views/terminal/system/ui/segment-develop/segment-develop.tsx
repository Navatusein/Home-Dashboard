"use client"

import {Grid} from "@/shared/ui-kit";
import {useService} from "@hakit/core";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import LayoutGridIcon from "@public/icons/software-editors-and-uI/layout-grid.svg";

export default function SegmentDevelop() {
  const service = useService("fully_kiosk", {device_id: "bf81236db0217da00f70e0651e582f84"});

  return (
    <Grid.Section colStart={12} rowStart={2} direction="vertical">
      <BaseButton
        icon={LayoutGridIcon}
        title="Main"
        onClickAction={() => service.loadUrl({serviceData: {url: "https://dashboard.navatuseinlab.uk/terminal/main"}})}
      />
      <BaseButton
        icon={LayoutGridIcon}
        title="Develop"
        onClickAction={() => service.loadUrl({serviceData: {url: "https://develop.navatuseinlab.uk/terminal/main"}})}
      />
    </Grid.Section>
  )
}
