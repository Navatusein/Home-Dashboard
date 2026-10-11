import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiCurrentAc,
  mdiFlash,
  mdiPowerPlug,
  mdiPowerPlugOff,
  mdiSineWave,
  mdiTransmissionTower
} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";

export default function GridSegment() {
  const inputSource = useEntity("sensor.gx_device_ac_active_input_source");

  const isGrid = inputSource.state == "grid";

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTransmissionTower} title="Grid" iconColor="blue"/>
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
          title="Grid Voltage"
          icon={mdiFlash}
          entity="sensor.multiplus_ii_48_4k5_55_32_id_276_input_voltage_l1"
        />
        <EntityStateCard
          title="Grid Current"
          icon={mdiCurrentAc}
          entity="sensor.gx_device_grid_current_l1"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <EntityStateCard
          title="Grid Power"
          icon={mdiTransmissionTower}
          entity="sensor.gx_device_grid_power_l1"
        />
        <EntityStateCard
          title="Grid Frequency"
          icon={mdiSineWave}
          entity="sensor.multiplus_ii_48_4k5_55_32_id_276_input_frequency_l1"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
      </Grid>
    </Flex>
  )
}
