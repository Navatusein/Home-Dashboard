import {Grid} from "@/shared/ui-kit";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import LightCeilingOnType2BrightVIcon
  from "@public/icons/home-automation-and-buildings/light-ceiling-on-type2-bright_v.svg";
import LightCeilingOffType2VIcon from "@public/icons/home-automation-and-buildings/light-ceiling-off-type2_v.svg";
import Lamp2Icon from "@public/icons/home-automation-and-buildings/lamp-2.svg";
import LampOffIcon from "@public/icons/home-automation-and-buildings/lamp-off.svg";

export default function SegmentLightControl() {
  return (
    <>
      <Grid.Section rowStart={6} colStart={7} direction="horizontal">
        <ToggleButton
          entity="light.virtual_large_corridor_light"
          title="LC Left"
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
      <Grid.Section rowStart={7} colStart={7} direction="horizontal">
        <ToggleButton
          entity="light.virtual_small_bedroom_light_left"
          title="SB Left"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
        <ToggleButton
          entity="light.virtual_small_bedroom_light_right"
          title="SB Right"
          iconEnabled={LightCeilingOnType2BrightVIcon}
          iconDisabled={LightCeilingOffType2VIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
    </>
  )
}
