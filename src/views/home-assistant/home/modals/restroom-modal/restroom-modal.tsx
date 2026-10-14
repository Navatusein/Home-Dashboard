import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiMotionSensor, mdiPaperRoll} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";
import {isOffState, useEntity} from "@hakit/core";

export default function RestroomModal() {
  const presenceEntity = useEntity("binary_sensor.restroom_ts0601_presence");

  const isPresence = !isOffState(presenceEntity.state);

  return (
    <QueryModalControl modal="restroom">
      <ModalPopUp.Header title="Restroom" icon={mdiPaperRoll}>
        <Flex justify="center" gap="xs">
          <Chips
            text={isPresence ? "Detected" : presenceEntity.custom.relativeTime}
            icon={mdiMotionSensor}
            iconColor={isPresence ? "green" : "blue"}
          />
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
