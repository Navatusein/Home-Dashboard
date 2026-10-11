import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiPineTree, mdiWindowClosedVariant, mdiSofa} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

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
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
