"use client"

import {BootstrapGrid, Flex} from "@/shared/ui-kit";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import ToolsSegment from "../../segments/tools-segment/tools-segment";
import ZigbeeSegment from "../../segments/zigbee-segment/zigbee-segment";
import CoordinatorSegment from "../../segments/coordinator-segment/coordinator-segment";

export default function ServiceView() {
  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <InfoCard/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <ZigbeeSegment/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <CoordinatorSegment/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <ToolsSegment/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
    </Flex>
  )
}
