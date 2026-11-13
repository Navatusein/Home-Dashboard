import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import Volume2Icon from "@public/icons/media/volume-2.svg";
import Volume3Icon from "@public/icons/media/volume-3.svg";
import {SliderButton} from "@/widgets/terminal-buttons/slider-button";
import {useTerminalDevice} from "@/shared/hooks/use-terminal-device";

export default function MediaSegment() {
  const {device} = useTerminalDevice();

  return (
    <>
      {/*Toggle speaker mute*/}
      <ToggleButton
        entity={device.mute}
        iconEnabled={Volume2Icon}
        iconDisabled={Volume3Icon}
        rowStart={7}
        colStart={12}
      />

      {/*Select volume*/}
      <SliderButton
        entity={device.volume}
        rowStart={4}
        colStart={12}
        rowSpan={3}
      />
    </>
  )
}
