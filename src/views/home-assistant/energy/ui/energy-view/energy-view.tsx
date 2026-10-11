"use client"

import {BootstrapGrid, Flex} from "@/shared/ui-kit";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import OverviewSegment from "../../segments/overview-segment/overview-segment";
import GridSegment from "../../segments/grid-segment/grid-segment";
import BatterySegment from "../../segments/battery-segment/battery-segment";
import PowerFlowSegment from "../../segments/power-flow-segment/power-flow-segment";

export default function EnergyView() {
  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <InfoCard/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <OverviewSegment/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <GridSegment/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={24}>
          <BatterySegment/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={24}>
          <PowerFlowSegment/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
    </Flex>
  )
}
