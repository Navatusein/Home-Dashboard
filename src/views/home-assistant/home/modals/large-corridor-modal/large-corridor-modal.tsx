import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiShoePrint} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

export default function LargeCorridorModal() {
  return (
    <QueryModalControl modal="large-corridor">
      <ModalPopUp.Header title="Large Corridor" icon={mdiShoePrint}>
        <Flex justify="center" gap="xs">
          <Chips text="2 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_large_corridor_light"
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
