"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import LightCeilingOnType2BrightVIcon
  from "@public/icons/home-automation-and-buildings/light-ceiling-on-type2-bright_v.svg";
import LightCeilingOffType2VIcon from "@public/icons/home-automation-and-buildings/light-ceiling-off-type2_v.svg";
import Lamp2Icon from "@public/icons/home-automation-and-buildings/lamp-2.svg";
import LampOffIcon from "@public/icons/home-automation-and-buildings/lamp-off.svg";
import ChristmasTreeIcon from "@public/icons/home-automation-and-buildings/christmas-tree.svg";
import ChristmasTreeOffIcon from "@public/icons/home-automation-and-buildings/christmas-tree-off.svg";

export default function LightSegment() {
  return (
    <>
      <Grid.Section rowStart={2} direction="horizontal">
        <BaseButton
          title="Small Bedroom"
          textWrap
        />
        <ToggleButton
          entity="light.virtual_small_bedroom_light_left"
          title="Left"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_small_bedroom_light_right"
          title="Right"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.yeelink_lamp22_1bc5_light"
          title="Mi Bar"
          iconEnabled={Lamp2Icon}
          iconDisabled={LampOffIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={3} direction="horizontal">
        <BaseButton
          title="Large Bedroom"
          textWrap
        />
        <ToggleButton
          entity="light.virtual_large_bedroom_light_left"
          title="Left"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_large_bedroom_light_right"
          title="Right"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={4} direction="horizontal">
        <BaseButton
          title="Living Room"
          textWrap
        />
        <ToggleButton
          entity="light.virtual_living_room_light_left"
          title="Left"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_living_room_light_right"
          title="Right"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_christmas_tree_lights"
          title="Tree"
          iconEnabled={ChristmasTreeIcon}
          iconDisabled={ChristmasTreeOffIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={5} direction="horizontal">
        <BaseButton
          title="Corridor"
          textWrap
        />
        <ToggleButton
          entity="light.virtual_large_corridor_light"
          title="Large"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_small_corridor_light"
          title="Small"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={6} direction="horizontal">
        <BaseButton
          title="Other"
          textWrap
        />
        <ToggleButton
          entity="light.virtual_kitchen_light"
          title="Kitchen"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_bathroom_light"
          title="Bathroom"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_restroom_light"
          title="Restroom"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
    </>
  )
}
