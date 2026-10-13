import {isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameBinarySensor, EntityNameButton, EntityNameSensor} from "@/shared/types/ha-domains";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import MediaCardLayout from "../media-card-layout/media-card-layout";

type Props = {
  titleEntity: EntityNameSensor,
  playingEntity: EntityNameBinarySensor,
  previousEntity: EntityNameButton,
  playPauseEntity: EntityNameButton,
  nextEntity: EntityNameButton,
}

export default function MediaControlsCard(props: Props) {
  const title = useEntity(props.titleEntity);
  const previous = useEntity(props.previousEntity);
  const playPause = useEntity(props.playPauseEntity);
  const next = useEntity(props.nextEntity);

  const isPlaying = !useEntityOff(props.playingEntity);
  const isUnavailable = isUnavailableState(title.state);

  return (
    <MediaCardLayout
      title={isUnavailable ? "--" : title.state}
      subtitle="Now Playing"
      isPlaying={isPlaying && !isUnavailable}
      disabled={isUnavailable}
      onPrevious={() => previous.service.press()}
      onPlayPause={() => playPause.service.press()}
      onNext={() => next.service.press()}
    />
  )
}
