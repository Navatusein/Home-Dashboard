import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiAirFilter,
  mdiCupWater,
  mdiDevices,
  mdiLightbulbGroup,
  mdiMotionSensor,
  mdiPineTree,
  mdiSofa,
  mdiSpray,
  mdiWindowClosedVariant
} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";

export default function LivingRoomModal() {
  return (
    <QueryModalControl modal="living-room">
      <ModalPopUp.Header title="Living Room" icon={mdiSofa}>
        <Flex justify="center" gap="xs">
          <Chips text="3 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
          <Chips text="Closed" icon={mdiWindowClosedVariant} iconColor="green"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={2} gap="xs">
            <LightCard
              title="Left"
              entity="light.virtual_living_room_light_left"
            />
            <LightCard
              title="Right"
              entity="light.virtual_living_room_light_right"
            />
            <LightCard
              title="Christmas Tree"
              icon={mdiPineTree}
              entity="light.virtual_christmas_tree_lights"
            />
          </Grid>
          <SegmentHeader icon={mdiDevices} title="Devices" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <Grid.Element rowSpan={2}>
              <SwitchCard
                tall
                title="Water Dispenser"
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
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
