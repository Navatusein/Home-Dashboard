import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiAirFilter,
  mdiCupWater,
  mdiDevices,
  mdiLightbulbGroup,
  mdiMotionSensor,
  mdiSilverwareForkKnife,
  mdiSpray,
  mdiWindowClosedVariant
} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";

export default function KitchenModal() {
  return (
    <QueryModalControl modal="kitchen">
      <ModalPopUp.Header title="Kitchen" icon={mdiSilverwareForkKnife}>
        <Flex justify="center" gap="xs">
          <Chips text="8 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
          <Chips text="Closed" icon={mdiWindowClosedVariant} iconColor="green"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_kitchen_light"
            />
          </Grid>
          <SegmentHeader icon={mdiDevices} title="Devices" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <Grid.Element rowSpan={2}>
              <SwitchCard
                tall
                title="Water Dispenser"
                icon={mdiCupWater}
                entity="switch.mmgg_wi11_17b5_pet_drinking_fountain"
                color="blue"
              />
            </Grid.Element>
            <EntityStateCard
              title="Filter"
              icon={mdiAirFilter}
              entity="sensor.mmgg_wi11_17b5_filter_left_time"
              unit="days"
            />
            <EntityStateCard
              title="Cleaning"
              icon={mdiSpray}
              entity="sensor.mmgg_wi11_17b5_remain_clean_time"
              unit="days"
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
