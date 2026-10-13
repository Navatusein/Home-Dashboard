import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiChip,
  mdiEthernet,
  mdiRestart,
  mdiRouterWireless,
  mdiUsb,
  mdiWifi,
  mdiZigbee
} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

const CONNECTION_MODES: Record<string, {text: string, icon: string}> = {
  wifi: {text: "Wi-Fi", icon: mdiWifi},
  eth: {text: "Ethernet", icon: mdiEthernet},
  usb: {text: "USB", icon: mdiUsb},
}

export default function CoordinatorSegment() {
  const connectionMode = useEntity("sensor.slzb_06p10_connection_mode");
  const isOnline = !useEntityOff("binary_sensor.slzb_06p10_internet");

  const mode = CONNECTION_MODES[connectionMode.state];

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiRouterWireless} title="SLZB-06P10" iconColor="purple"/>
      <Grid columns={2} gap="xs">
        <EntityStateCard
          title="Core Temp"
          icon={mdiChip}
          entity="sensor.slzb_06p10_core_chip_temp"
        />
        <Grid.Element rowSpan={2}>
          <StateCard
            tall
            title="Connection"
            text={isOnline ? (mode?.text ?? "--") : "Offline"}
            icon={mode?.icon ?? mdiRouterWireless}
            color={isOnline ? "purple" : "red"}
          />
        </Grid.Element>
        <EntityStateCard
          title="Zigbee Temp"
          icon={mdiZigbee}
          entity="sensor.slzb_06p10_zigbee_chip_temp"
        />
        <ActionCard
          title="Core"
          description="Restart"
          icon={mdiRestart}
          entity="button.slzb_06p10_core_restart"
          confirm
        />
        <ActionCard
          title="Zigbee"
          description="Restart"
          icon={mdiRestart}
          entity="button.slzb_06p10_zigbee_restart"
          confirm
        />
      </Grid>
    </Flex>
  )
}
