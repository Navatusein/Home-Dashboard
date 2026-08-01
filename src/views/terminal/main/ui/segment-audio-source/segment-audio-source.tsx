import {Grid} from "@/shared/ui-kit";
import {SelectButton} from "@/widgets/terminal-buttons/select-button";
import HeadsetIcon from "@public/icons/media/headset.svg";
import HeadphonesIcon from "@public/icons/media/headphones.svg";
import CardboardsIcon from "@public/icons/devices-and-networks/cardboards.svg";
import DeviceAirpodsIcon from "@public/icons/devices-and-networks/device-airpods.svg";
import Microphone2Icon from "@public/icons/media/microphone-2.svg";
import DeviceSpeakerIcon from "@public/icons/media/device-speaker.svg";

export default function SegmentAudioSource() {
  return (
    <>
      <Grid.Section rowStart={5} colStart={10} direction="horizontal">
        <SelectButton
          entity="select.navatusein_pc_windows_input_device"
          state="Razer Nari"
          title="Razer"
          icon={HeadsetIcon}
          colorEnabled="blue"
        />
        <SelectButton
          entity="select.navatusein_pc_windows_output_device"
          state="Razer Nari"
          title="Razer"
          icon={HeadphonesIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={6} colStart={10} direction="horizontal">
        <SelectButton
          entity="select.navatusein_pc_windows_input_device"
          state="Quest 3"
          title="Quest 3"
          icon={CardboardsIcon}
          colorEnabled="blue"
        />
        <SelectButton
          entity="select.navatusein_pc_windows_output_device"
          state="Buds Pro"
          title="Buts Pro"
          icon={DeviceAirpodsIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
      <Grid.Section rowStart={7} colStart={10} direction="horizontal">
        <SelectButton
          entity="select.navatusein_pc_windows_input_device"
          state="Microphone"
          title="Default"
          icon={Microphone2Icon}
          colorEnabled="blue"
        />
        <SelectButton
          entity="select.navatusein_pc_windows_output_device"
          state="Speakers"
          title="Default"
          icon={DeviceSpeakerIcon}
          colorEnabled="blue"
        />
      </Grid.Section>
    </>
  )
}
