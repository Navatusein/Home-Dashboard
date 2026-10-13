import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiVolumeHigh} from "@mdi/js";
import {PcSoundCard} from "@/widgets/home-assistant-cards/pc-sound-card";

export default function SoundSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiVolumeHigh} title="Sound" iconColor="blue"/>
      <PcSoundCard
        volumeEntity="number.navatusein_pc_windows_volume"
        muteEntity="switch.navatusein_pc_windows_mute"
        outputEntity="select.navatusein_pc_windows_output_device"
        inputEntity="select.navatusein_pc_windows_input_device"
      />
    </Flex>
  )
}
