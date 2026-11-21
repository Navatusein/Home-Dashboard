import {isUnavailableState, useHass} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityNameButton, EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {RepeatMode} from "@/shared/native/dashboard-plugin";
import NowPlayingCard from "../now-playing-card/now-playing-card";

type Props = {
  entity: EntityNameMediaPlayer,
}

export default function EntityNowPlayingCard(props: Props) {
  const entity = useEntity(props.entity);
  const favorite = useEntity(`button.${props.entity.split(".")[1]}_favorite_current_song` as EntityNameButton);
  const hassUrl = useHass((state) => state.hassUrl);

  const attributes = entity.attributes;

  const isUnavailable = isUnavailableState(entity.state);
  const isPlaying = entity.state == "playing";
  const hasMedia = !isUnavailable && attributes.media_title != null;
  const duration = attributes.media_duration ?? 0;
  const picture = attributes.entity_picture_local ?? attributes.entity_picture;

  return (
    <NowPlayingCard
      player={{
        available: !isUnavailable,
        playing: isPlaying,
        canSeek: hasMedia && (isPlaying || entity.state == "paused") && duration > 0,
        title: isUnavailable ? "--" : (attributes.media_title ?? "Nothing playing"),
        subtitle: [attributes.media_artist, attributes.media_album_name].filter(Boolean).join(" · ") || (attributes.friendly_name ?? ""),
        image: hasMedia && picture && hassUrl ? new URL(picture, hassUrl).href : undefined,
        position: attributes.media_position ?? 0,
        positionAt: attributes.media_position_updated_at ? new Date(attributes.media_position_updated_at).getTime() : 0,
        duration: duration,
        volume: Math.round((attributes.volume_level ?? 0) * 100),
        shuffle: !!attributes.shuffle,
        repeat: (attributes.repeat ?? "off") as RepeatMode,
      }}
      actions={{
        togglePlay: () => entity.service.mediaPlayPause(),
        previous: () => entity.service.mediaPreviousTrack(),
        next: () => entity.service.mediaNextTrack(),
        seek: (position) => entity.service.mediaSeek({serviceData: {seek_position: position}}),
        setVolume: (volume) => entity.service.volumeSet({serviceData: {volume_level: volume / 100}}),
        setShuffle: (shuffle) => entity.service.shuffleSet({serviceData: {shuffle: shuffle}}),
        setRepeat: (repeat) => entity.service.repeatSet({serviceData: {repeat: repeat}}),
        favorite: () => favorite.service.press(),
        canFavorite: hasMedia && !isUnavailableState(favorite.state),
      }}
    />
  )
}
