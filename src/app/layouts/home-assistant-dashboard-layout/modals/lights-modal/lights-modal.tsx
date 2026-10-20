import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBathtub,
  mdiBedKing,
  mdiBedQueen,
  mdiDeskLamp,
  mdiLightbulbGroup,
  mdiPaperRoll,
  mdiPineTree,
  mdiShoePrint,
  mdiSilverwareForkKnife,
  mdiSofa
} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";

export default function LightsModal() {
  return (
    <QueryModalControl modal="lights">
      <ModalPopUp.Header title="Lights" icon={mdiLightbulbGroup}/>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <Grid columns={1} gap="xs">
            <LightCard
              title="All Lights"
              icon={mdiLightbulbGroup}
              entity="light.virtual_light_master"
            />
          </Grid>
          <SegmentHeader icon={mdiSofa} title="Living Room" iconColor="yellow"/>
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
          <SegmentHeader icon={mdiSilverwareForkKnife} title="Kitchen" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_kitchen_light"
            />
          </Grid>
          <SegmentHeader icon={mdiBedKing} title="Large Bedroom" iconColor="yellow"/>
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
          <SegmentHeader icon={mdiBedQueen} title="Small Bedroom" iconColor="yellow"/>
          <Grid columns={2} gap="xs">
            <LightCard
              title="Left"
              entity="light.virtual_small_bedroom_light_left"
            />
            <LightCard
              title="Right"
              entity="light.virtual_small_bedroom_light_right"
            />
            <LightCard
              title="Monitor Light Bar"
              icon={mdiDeskLamp}
              entity="light.yeelink_lamp22_1bc5_light"
            />
          </Grid>
          <SegmentHeader icon={mdiShoePrint} title="Large Corridor" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_large_corridor_light"
            />
          </Grid>
          <SegmentHeader icon={mdiShoePrint} title="Small Corridor" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_small_corridor_light"
            />
          </Grid>
          <SegmentHeader icon={mdiBathtub} title="Bathroom" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Main"
              entity="light.virtual_bathroom_light"
            />
          </Grid>
          <SegmentHeader icon={mdiPaperRoll} title="Restroom" iconColor="yellow"/>
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
