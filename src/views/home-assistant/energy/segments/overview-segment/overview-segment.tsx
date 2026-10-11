import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightningBolt} from "@mdi/js";
import {EnergyDistributionCard} from "@/widgets/home-assistant-cards/energy-distribution-card";

export default function OverviewSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiLightningBolt} title="Overview" iconColor="yellow"/>
      <EnergyDistributionCard
        gridPowerEntity="sensor.gx_device_grid_power_l1"
        homePowerEntity="sensor.gx_device_consumption_power_l1"
        batteryChargeEntity="sensor.pylontech_battery_id_512_charge"
        batteryChargingPowerEntity="sensor.pylontech_battery_id_512_power"
      />
    </Flex>
  )
}
