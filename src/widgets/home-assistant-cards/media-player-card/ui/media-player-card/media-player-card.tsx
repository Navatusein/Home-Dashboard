import {isUnavailableState, useEntity, useHass} from "@hakit/core";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import MediaCardLayout from "../media-card-layout/media-card-layout";

type Props = {
  entity: EntityNameMediaPlayer,
}

export default function MediaPlayerCard(props: Props) {
  const entity = useEntity(props.entity);
  const hassUrl = useHass((state) => state.hassUrl);

  const isUnavailable = isUnavailableState(entity.state);
  const picture = entity.attributes.entity_picture;

  return (
    <MediaCardLayout
      title={isUnavailable ? "--" : (entity.attributes.media_title ?? "Nothing playing")}
      subtitle={entity.attributes.media_artist ?? entity.attributes.friendly_name ?? ""}
      image={picture && hassUrl ? new URL(picture, hassUrl).href : undefined}
      isPlaying={entity.state == "playing"}
      disabled={isUnavailable}
      onPrevious={() => entity.service.mediaPreviousTrack()}
      onPlayPause={() => entity.service.mediaPlayPause()}
      onNext={() => entity.service.mediaNextTrack()}
    />
  )
}
