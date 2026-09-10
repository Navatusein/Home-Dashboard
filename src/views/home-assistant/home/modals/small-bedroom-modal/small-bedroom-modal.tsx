import {Card, Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {mdiBedQueen, mdiDevices, mdiLightbulbGroup, mdiThermostat, mdiMotionSensor, mdiWindowClosedVariant} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {ClimateCard} from "@/widgets/home-assistant-cards/climate-card";

export default function SmallBedroomModal() {
  return (
    <QueryModalControl modal="small-bedroom">
      <ModalPopUp.Header title="Small Bedroom" icon={mdiBedQueen}/>
      <Flex vertical gap="sm">
        <Flex justify="center" gap="xs">
          <Chips text="19 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
          <Chips text="Closed" icon={mdiWindowClosedVariant} iconColor="green"/>
        </Flex>
        <SegmentHeader icon={mdiThermostat} title="Climate" iconColor="blue"/>
        <Grid columns={1} gap="xs">
          <ClimateCard 
            climateEntity="climate.small_bedroom_ac"
            title="AC"
          />
        </Grid>
        <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
        <Grid columns={2} gap="xs">
          <Card stackCount={1}>Card 1</Card>
          <Card stackCount={1}>Card 2</Card>
        </Grid>
        <SegmentHeader icon={mdiDevices} title="Devices" iconColor="teal"/>
        <Grid columns={1} gap="xs">
          <Card stackCount={1}>Card 1</Card>
        </Grid>
      </Flex>
    </QueryModalControl>
  )
}
