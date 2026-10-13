import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiPlayPause} from "@mdi/js";
import {MediaControlsCard} from "@/widgets/home-assistant-cards/media-player-card";

export default function MediaSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiPlayPause} title="Media" iconColor="green"/>
      <MediaControlsCard
        titleEntity="sensor.navatusein_pc_now_playing"
        playingEntity="binary_sensor.navatusein_pc_media_playing"
        previousEntity="button.navatusein_pc_media_previous_track"
        playPauseEntity="button.navatusein_pc_media_play_pause"
        nextEntity="button.navatusein_pc_media_next_track"
      />
    </Flex>
  )
}
