import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiAirFilter, mdiCupWater, mdiPaw, mdiSpray} from "@mdi/js";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";

export default function WaterDispensersSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiPaw} title="Water Dispensers" iconColor="blue"/>
      <Grid columns={2} gap="xs">
        <Grid.Element rowSpan={2}>
          <SwitchCard
            tall
            title="Living Room"
            icon={mdiCupWater}
            entity="switch.mmgg_s1_ecab_pet_drinking_fountain"
            color="blue"
          />
        </Grid.Element>
        <EntityStateCard
          title="Filter"
          icon={mdiAirFilter}
          entity="sensor.mmgg_s1_ecab_filter_left_time"
          unit="days"
        />
        <EntityStateCard
          title="Cleaning"
          icon={mdiSpray}
          entity="sensor.mmgg_s1_ecab_remain_clean_time"
          unit="days"
        />
        <EntityStateCard
          title="Filter"
          icon={mdiAirFilter}
          entity="sensor.mmgg_wi11_17b5_filter_left_time"
          unit="days"
        />
        <Grid.Element rowSpan={2}>
          <SwitchCard
            tall
            title="Kitchen"
            icon={mdiCupWater}
            entity="switch.mmgg_wi11_17b5_pet_drinking_fountain"
            color="teal"
          />
        </Grid.Element>
        <EntityStateCard
          title="Cleaning"
          icon={mdiSpray}
          entity="sensor.mmgg_wi11_17b5_remain_clean_time"
          unit="days"
        />
      </Grid>
    </Flex>
  )
}
