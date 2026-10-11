import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiPaperRoll} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

export default function RestroomModal() {
  return (
    <QueryModalControl modal="restroom">
      <ModalPopUp.Header title="Restroom" icon={mdiPaperRoll}>
        <Flex justify="center" gap="xs">
          <Chips text="25 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_restroom_light"
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
