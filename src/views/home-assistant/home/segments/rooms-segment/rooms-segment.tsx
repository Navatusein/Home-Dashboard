import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBathtub,
  mdiBedKing,
  mdiBedQueen,
  mdiPaperRoll,
  mdiShoePrint,
  mdiSilverwareForkKnife,
  mdiSofa,
  mdiTextureBox
} from "@mdi/js";
import {RoomCard} from "@/widgets/home-assistant-cards/room-card";

export default function RoomsSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTextureBox} title="Rooms"/>
      <Grid columns={2} gap="xs">
        <RoomCard
          roomName="Small Bedroom"
          roomIcon={mdiBedQueen}
          roomModalPath="small-bedroom"
          lightEntity="light.yeelink_lamp22_1bc5_light"
          temperatureEntity="sensor.small_bedroom_ih_k009_temperature"
        />
        <RoomCard
          roomName="Large Bedroom"
          roomIcon={mdiBedKing}
          roomModalPath="large-bedroom"
          lightEntity="light.virtual_large_bedroom_light_master"
          temperatureEntity="sensor.kitchen_ih_k009_temperature"
        />
        <RoomCard
          roomName="Living room"
          roomIcon={mdiSofa}
          roomModalPath="living-room"
          lightEntity="light.virtual_living_room_light_master"
          temperatureEntity="sensor.small_bedroom_ih_k009_temperature"
        />
        <RoomCard
          roomName="Large Corridor"
          roomIcon={mdiShoePrint}
          roomModalPath="large-corridor"
          lightEntity="light.virtual_large_corridor_light"
          temperatureEntity="sensor.small_bedroom_ih_k009_temperature"
        />
        <RoomCard
          roomName="Small Corridor"
          roomIcon={mdiShoePrint}
          roomModalPath="small-corridor"
          lightEntity="light.virtual_small_corridor_light"
          temperatureEntity="sensor.kitchen_ih_k009_temperature"
        />
        <RoomCard
          roomName="Bathroom"
          roomIcon={mdiBathtub}
          roomModalPath="bathroom"
          lightEntity="light.virtual_bathroom_light"
          temperatureEntity="sensor.kitchen_ih_k009_temperature"
        />
        <RoomCard
          roomName="Restroom"
          roomIcon={mdiPaperRoll}
          roomModalPath="restroom"
          lightEntity="light.virtual_restroom_light"
          temperatureEntity="sensor.kitchen_ih_k009_temperature"
        />
        <RoomCard
          roomName="Kitchen"
          roomIcon={mdiSilverwareForkKnife}
          roomModalPath="kitchen"
          lightEntity="light.virtual_kitchen_light"
          temperatureEntity="sensor.kitchen_ih_k009_temperature"
        />
      </Grid>
    </Flex>
  )
}
