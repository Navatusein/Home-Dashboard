import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiMicrophone, mdiSpeaker, mdiVolumeHigh, mdiVolumeOff} from "@mdi/js";
import {NumberCard} from "@/widgets/home-assistant-cards/number-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {SelectCard} from "@/widgets/home-assistant-cards/select-card";

export default function SoundSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiVolumeHigh} title="Sound" iconColor="blue"/>
      <Grid columns={1} gap="xs">
        <NumberCard
          title="Volume"
          icon={mdiVolumeHigh}
          entity="number.navatusein_pc_windows_volume"
        />
        <SwitchCard
          title="Mute"
          icon={mdiVolumeOff}
          entity="switch.navatusein_pc_windows_mute"
          color="red"
        />
        <SelectCard
          title="Output"
          icon={mdiSpeaker}
          entity="select.navatusein_pc_windows_output_device"
        />
        <SelectCard
          title="Input"
          icon={mdiMicrophone}
          entity="select.navatusein_pc_windows_input_device"
        />
      </Grid>
    </Flex>
  )
}
