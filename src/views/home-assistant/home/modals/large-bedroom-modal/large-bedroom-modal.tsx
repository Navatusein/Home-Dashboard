import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiWindowClosedVariant, mdiBedKing} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

export default function LargeBedroomModal() {
  return (
    <QueryModalControl modal="large-bedroom">
      <ModalPopUp.Header title="Large Bedroom" icon={mdiBedKing}>
        <Flex justify="center" gap="xs">
          <Chips text="12 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
          <Chips text="Closed" icon={mdiWindowClosedVariant} iconColor="green"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={2} gap="xs">
            <LightCard
              title="Left"
              entity="light.virtual_large_bedroom_light_left"
            />
            <LightCard
              title="Right"
              entity="light.virtual_large_bedroom_light_right"
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
