import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiWindowClosedVariant, mdiSilverwareForkKnife} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

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
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
