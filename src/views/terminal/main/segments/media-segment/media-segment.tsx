import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import Volume2Icon from "@public/icons/media/volume-2.svg";
import Volume3Icon from "@public/icons/media/volume-3.svg";
import {SliderButton} from "@/widgets/terminal-buttons/slider-button";

export default function MediaSegment() {
  return (
    <>
      {/*Toggle speaker mute*/}
      <ToggleButton
        entity="switch.navatusein_pc_windows_mute"
        iconEnabled={Volume2Icon}
        iconDisabled={Volume3Icon}
        rowStart={7}
        colStart={12}
      />

      {/*Select volume*/}
      <SliderButton
        entity="number.navatusein_pc_windows_volume"
        rowStart={4}
        colStart={12}
        rowSpan={3}
      />
    </>
  )
}
