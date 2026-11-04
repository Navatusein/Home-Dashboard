import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBattery,
  mdiBatteryArrowDown,
  mdiBatteryArrowUp,
  mdiBatteryCharging,
  mdiBatteryLock,
  mdiCurrentDc,
  mdiHomeBattery
} from "@mdi/js";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";
import {useNow} from "@/shared/hooks/use-now";
import {formatDuration} from "@/shared/helpers/format-duration";

const POWER_THRESHOLD = 10;

export default function BatterySegment() {
  const now = useNow(30_000);
  const chargingPower = Number(useEntity("sensor.pylontech_battery_id_512_power").state);
  const inputSource = useEntity("sensor.gx_device_ac_active_input_source");
  const gridLostTime = useEntity("input_datetime.grid_power_lost_time_started");

  const isCharging = chargingPower > POWER_THRESHOLD;
  const isDischarging = chargingPower < -POWER_THRESHOLD;
  const gridLostAt = gridLostTime.attributes.timestamp;
  const isGridLost = inputSource.state == "not_connected" && gridLostAt != null;

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiHomeBattery} title="Battery" iconColor="green"/>
      <StateCard
        title={isGridLost ? `No grid for ${formatDuration((now - gridLostAt * 1000) / 60_000)}` : "Battery State"}
        text={isCharging ? "Charging" : isDischarging ? "Discharging" : "Idle"}
        icon={isCharging ? mdiBatteryArrowUp : isDischarging ? mdiBatteryArrowDown : mdiBattery}
        color={isCharging ? "green" : isDischarging ? "orange" : "blue"}
      />
      <Grid columns={2} gap="xs">
        <EntityStateCard
          title="Charge"
          icon={mdiHomeBattery}
          entity="sensor.pylontech_battery_id_512_charge"
        />
        <EntityStateCard
          title="Charge Limit"
          icon={mdiBatteryLock}
          entity="sensor.gx_device_active_soc_limit"
        />
        <EntityStateCard
          title="Battery Voltage"
          icon={mdiCurrentDc}
          entity="sensor.gx_device_dc_battery_voltage"
          textTransformer={numberFixedTextTransformerProvider(1)}
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
