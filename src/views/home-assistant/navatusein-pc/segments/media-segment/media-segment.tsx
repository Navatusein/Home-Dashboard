import {Button, Card, Flex, RoundedIcon, SegmentHeader, Space, Typography} from "@/shared/ui-kit";
import {mdiMusic, mdiPause, mdiPlay, mdiPlayPause, mdiSkipNext, mdiSkipPrevious} from "@mdi/js";
import {isUnavailableState, useEntity} from "@hakit/core";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

export default function MediaSegment() {
  const nowPlaying = useEntity("sensor.navatusein_pc_now_playing");
  const previousTrack = useEntity("button.navatusein_pc_media_previous_track");
  const playPause = useEntity("button.navatusein_pc_media_play_pause");
  const nextTrack = useEntity("button.navatusein_pc_media_next_track");

  const isPlaying = !useEntityOff("binary_sensor.navatusein_pc_media_playing");
  const isUnavailable = isUnavailableState(nowPlaying.state);

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiPlayPause} title="Media" iconColor="green"/>
      <Card stackCount={1} padding="xs" color={isPlaying ? "green" : undefined}>
        <Flex align="center" justify="space-between" gap="xs" style={{height: "100%"}}>
          <Flex align="center" gap="xs" style={{minWidth: 0}}>
            <RoundedIcon path={mdiMusic}/>
            <Flex vertical style={{minWidth: 0}}>
              <Typography.Text bold style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                {isUnavailable ? "--" : nowPlaying.state}
              </Typography.Text>
              <Typography.Text fontSize="sm" textColor="secondary">
                Now Playing
              </Typography.Text>
            </Flex>
          </Flex>
          <Space compact>
            <Button
              shape="round"
              icon={mdiSkipPrevious}
              onClick={() => previousTrack.service.press()}
            />
            <Button
              shape="round"
              icon={isPlaying ? mdiPause : mdiPlay}
              onClick={() => playPause.service.press()}
            />
            <Button
              shape="round"
              icon={mdiSkipNext}
              onClick={() => nextTrack.service.press()}
            />
          </Space>
        </Flex>
      </Card>
    </Flex>
  )
}
