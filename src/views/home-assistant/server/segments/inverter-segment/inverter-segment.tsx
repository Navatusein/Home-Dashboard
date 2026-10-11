import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBatteryCharging,
  mdiHomeBattery,
  mdiHomeLightningBolt,
  mdiLightningBolt,
  mdiPowerPlug,
  mdiPowerPlugOff,
  mdiTransmissionTower
} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";

export default function InverterSegment() {
  const inputSource = useEntity("sensor.gx_device_ac_active_input_source");

  const isGrid = inputSource.state == "grid";

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiLightningBolt} title="Inverter" iconColor="yellow"/>
      <Grid columns={2} gap="xs">
        <Grid.Element rowSpan={2}>
          <StateCard
            tall
            title="Power Source"
            text={isGrid ? "Grid" : "Battery"}
            icon={isGrid ? mdiPowerPlug : mdiPowerPlugOff}
            color={isGrid ? "yellow" : "red"}
          />
        </Grid.Element>
        <EntityStateCard
          title="Battery"
          icon={mdiHomeBattery}
          entity="sensor.pylontech_battery_id_512_charge"
        />
        <EntityStateCard
          title="Consumption"
          icon={mdiHomeLightningBolt}
          entity="sensor.gx_device_consumption_power_l1"
        />
        <EntityStateCard
          title="Grid Power"
          icon={mdiTransmissionTower}
          entity="sensor.gx_device_grid_power_l1"
        />
        <EntityStateCard
          title="Battery Power"
          icon={mdiBatteryCharging}
          entity="sensor.gx_device_dc_battery_power"
        />
      </Grid>
    </Flex>
  )
}
