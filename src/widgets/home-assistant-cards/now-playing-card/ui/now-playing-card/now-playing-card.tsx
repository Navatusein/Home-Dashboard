import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Button, Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {isUnavailableState, useHass} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {useNow} from "@/shared/hooks/use-now";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {EntityNameButton, EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {
  mdiHeartOutline,
  mdiMusic,
  mdiPause,
  mdiPlay,
  mdiRepeat,
  mdiRepeatOff,
  mdiRepeatOnce,
  mdiShuffle,
  mdiShuffleDisabled,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiVolumeHigh
} from "@mdi/js";
import {formatTrackTime} from "../../helpers/format-track-time";
import Waveform from "../waveform/waveform";
import VolumeSlider from "../volume-slider/volume-slider";
import styles from "./now-playing-card.module.scss";

const NEXT_REPEAT = {off: "all", all: "one", one: "off"} as const;

const REPEAT_ICONS = {off: mdiRepeatOff, all: mdiRepeat, one: mdiRepeatOnce};

const VOLUME_HIDE_DELAY = 4000;

type Props = {
  entity: EntityNameMediaPlayer,
}

export default function NowPlayingCard(props: Props) {
  const entity = useEntity(props.entity);
  const favorite = useEntity(`button.${props.entity.split(".")[1]}_favorite_current_song` as EntityNameButton);
  const hassUrl = useHass((state) => state.hassUrl);
  const isMobile = useBreakpoint("sm");
  const now = useNow(1000);

  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [seekTarget, setSeekTarget] = useState<{position: number, at: number, updatedAt: unknown} | null>(null);
  const [dragVolume, setDragVolume] = useState<number | null>(null);
  const [coverOffset, setCoverOffset] = useState(0);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const attributes = entity.attributes;

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const cover = coverRef.current!;
      setCoverOffset(cardRef.current!.offsetHeight - cover.offsetHeight - parseFloat(getComputedStyle(cover).marginTop));
    });

    observer.observe(cardRef.current!);
    return () => observer.disconnect();
  }, []);

  const isUnavailable = isUnavailableState(entity.state);
  const isPlaying = entity.state == "playing";
  const hasMedia = !isUnavailable && attributes.media_title != null;

  const picture = attributes.entity_picture_local ?? attributes.entity_picture;
  const image = hasMedia && picture && hassUrl ? new URL(picture, hassUrl).href : undefined;

  const duration = attributes.media_duration ?? 0;
  const canSeek = hasMedia && (isPlaying || entity.state == "paused") && duration > 0;
  const updatedAt = attributes.media_position_updated_at ? new Date(attributes.media_position_updated_at).getTime() : now;
  const pendingSeek = seekTarget?.updatedAt === attributes.media_position_updated_at ? seekTarget : null;
  const reportedPosition = pendingSeek
    ? pendingSeek.position + (isPlaying ? (now - pendingSeek.at) / 1000 : 0)
    : (attributes.media_position ?? 0) + (isPlaying ? (now - updatedAt) / 1000 : 0);
  const position = dragPosition ?? Math.min(duration, reportedPosition);

  const volume = dragVolume ?? Math.round((attributes.volume_level ?? 0) * 100);

  useEffect(() => {
    if (!isVolumeOpen)
      return;

    const timer = setTimeout(() => setIsVolumeOpen(false), VOLUME_HIDE_DELAY);
    return () => clearTimeout(timer);
  }, [isVolumeOpen, volume]);
  const repeat = (attributes.repeat ?? "off") as keyof typeof NEXT_REPEAT;

  const seek = (value: number) => {
    setDragPosition(null);
    setSeekTarget({position: value, at: Date.now(), updatedAt: attributes.media_position_updated_at});
    entity.service.mediaSeek({serviceData: {seek_position: value}});
  }

  const changeVolume = (value: number) => {
    setDragVolume(null);
    entity.service.volumeSet({serviceData: {volume_level: value / 100}});
  }

  const volumeSlider = (
    <VolumeSlider
      vertical={!isMobile}
      colored={isPlaying}
      className={isMobile ? styles["volume"] : undefined}
      value={volume}
      disabled={isUnavailable}
      onValueChange={setDragVolume}
      onValueCommit={changeVolume}
    />
  );

  return (
    <Card ref={cardRef} padding="xs" color={isPlaying ? "purple" : undefined} className={clsx(isPlaying && styles["colored"])}>
      <Flex vertical={isMobile} gap="sm">
        <div
          ref={coverRef}
          className={isMobile ? styles["cover-mobile"] : styles["cover"]}
          style={{
            ["--cover-offset" as never]: `${coverOffset}px`,
            ...(image && {backgroundImage: `url("${image}")`}),
          }}
        >
          {!image && (
            <Icon path={mdiMusic} size="xl" color="secondary"/>
          )}
        </div>
        <Flex vertical grow justify="space-between" gap="sm" className={styles["content"]}>
          <Flex align="center" justify="space-between" gap="xs">
            <Flex vertical grow className={styles["text"]}>
              <Typography.Text bold className={styles["title"]}>
                {isUnavailable ? "--" : (attributes.media_title ?? "Nothing playing")}
              </Typography.Text>
              <Typography.Text fontSize="sm" textColor="secondary" className={styles["title"]}>
                {[attributes.media_artist, attributes.media_album_name].filter(Boolean).join(" · ") || attributes.friendly_name}
              </Typography.Text>
            </Flex>
            {isMobile && (
              <Button
                outline
                shape="round"
                icon={mdiVolumeHigh}
                className={styles["control"]}
                disabled={isUnavailable}
                onClick={() => setIsVolumeOpen(!isVolumeOpen)}
              />
            )}
            <Button
              outline
              shape="round"
              icon={mdiHeartOutline}
              className={styles["control"]}
              disabled={!hasMedia || isUnavailableState(favorite.state)}
              onClick={() => favorite.service.press()}
            />
          </Flex>
          <Flex vertical gap="xxs">
            <Waveform
              seed={attributes.media_title ?? ""}
              count={isMobile ? 44 : 72}
              value={position}
              max={duration}
              colored={isPlaying}
              disabled={!canSeek}
              onValueChange={setDragPosition}
              onValueCommit={seek}
            />
            <Flex justify="space-between">
              <Typography.Text fontSize="xs" textColor="secondary">
                {formatTrackTime(position)}
              </Typography.Text>
              <Typography.Text fontSize="xs" textColor="secondary">
                {formatTrackTime(duration)}
              </Typography.Text>
            </Flex>
          </Flex>
          {isMobile && isVolumeOpen ? (
            <Flex align="center" className={styles["volume-row"]}>
              {volumeSlider}
            </Flex>
          ) : (
            <Flex align="center" justify={isMobile ? "space-between" : "center"} gap="md">
              <Button
                outline
                shape="round"
                icon={attributes.shuffle ? mdiShuffle : mdiShuffleDisabled}
                className={styles["control"]}
                disabled={isUnavailable}
                onClick={() => entity.service.shuffleSet({serviceData: {shuffle: !attributes.shuffle}})}
              />
              <Button
                outline
                shape="round"
                icon={mdiSkipPrevious}
                className={clsx(styles["control"], styles["large"])}
                disabled={isUnavailable}
                onClick={() => entity.service.mediaPreviousTrack()}
              />
              <Button
                shape="round"
                icon={isPlaying ? mdiPause : mdiPlay}
                className={clsx(styles["play"], styles["large"])}
                disabled={isUnavailable}
                onClick={() => entity.service.mediaPlayPause()}
              />
              <Button
                outline
                shape="round"
                icon={mdiSkipNext}
                className={clsx(styles["control"], styles["large"])}
                disabled={isUnavailable}
                onClick={() => entity.service.mediaNextTrack()}
              />
              <Button
                outline
                shape="round"
                icon={REPEAT_ICONS[repeat]}
                className={styles["control"]}
                disabled={isUnavailable}
                onClick={() => entity.service.repeatSet({serviceData: {repeat: NEXT_REPEAT[repeat]}})}
              />
            </Flex>
          )}
        </Flex>
        {!isMobile && volumeSlider}
      </Flex>
    </Card>
  )
}
