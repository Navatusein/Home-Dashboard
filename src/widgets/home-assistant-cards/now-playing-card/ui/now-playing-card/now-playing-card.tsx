import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Button, Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {useNow} from "@/shared/hooks/use-now";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
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
import {NowPlaying, NowPlayingActions} from "../../types/types";
import Waveform from "../waveform/waveform";
import VolumeSlider from "../volume-slider/volume-slider";
import styles from "./now-playing-card.module.scss";

const NEXT_REPEAT = {off: "all", all: "one", one: "off"} as const;

const REPEAT_ICONS = {off: mdiRepeatOff, all: mdiRepeat, one: mdiRepeatOnce};

const VOLUME_HIDE_DELAY = 4000;
const SEEK_HOLD = 5000;
const SEEK_TOLERANCE = 3;

type Props = {
  player: NowPlaying,
  actions: NowPlayingActions,
}

export default function NowPlayingCard(props: Props) {
  const {player, actions} = props;
  const isMobile = useBreakpoint("sm");
  const now = useNow(1000);

  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [seekTarget, setSeekTarget] = useState<{position: number, at: number} | null>(null);
  const [dragVolume, setDragVolume] = useState<number | null>(null);
  const [coverOffset, setCoverOffset] = useState(0);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const cover = coverRef.current!;
      setCoverOffset(cardRef.current!.offsetHeight - cover.offsetHeight - parseFloat(getComputedStyle(cover).marginTop));
    });

    observer.observe(cardRef.current!);
    return () => observer.disconnect();
  }, []);

  const isUnavailable = !player.available;
  const isPlaying = player.playing;
  const duration = player.duration;
  const reportedPosition = player.position + (isPlaying && player.positionAt ? Math.max(0, now - player.positionAt) / 1000 : 0);
  const seekPosition = seekTarget && seekTarget.position + (isPlaying ? Math.max(0, now - seekTarget.at) / 1000 : 0);
  const isSeekPending = seekPosition != null && now - seekTarget!.at < SEEK_HOLD && Math.abs(reportedPosition - seekPosition) > SEEK_TOLERANCE;
  const position = dragPosition ?? Math.min(duration, isSeekPending ? seekPosition : reportedPosition);

  const volume = dragVolume ?? player.volume;

  useEffect(() => {
    if (!isVolumeOpen)
      return;

    const timer = setTimeout(() => setIsVolumeOpen(false), VOLUME_HIDE_DELAY);
    return () => clearTimeout(timer);
  }, [isVolumeOpen, volume]);
  const repeat = player.repeat;

  const seek = (value: number) => {
    setDragPosition(null);
    setSeekTarget({position: value, at: Date.now()});
    actions.seek(value);
  }

  const changeVolume = (value: number) => {
    setDragVolume(null);
    actions.setVolume(value);
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
            ...(player.image && {backgroundImage: `url("${player.image}")`}),
          }}
        >
          {!player.image && (
            <Icon path={mdiMusic} size="xl" color="secondary"/>
          )}
        </div>
        <Flex vertical grow justify="space-between" gap="sm" className={styles["content"]}>
          <Flex align="center" justify="space-between" gap="xs">
            <Flex vertical grow className={styles["text"]}>
              <Typography.Text bold className={styles["title"]}>
                {player.title}
              </Typography.Text>
              <Typography.Text fontSize="sm" textColor="secondary" className={styles["title"]}>
                {player.subtitle}
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
            {actions.favorite && (
              <Button
                outline
                shape="round"
                icon={mdiHeartOutline}
                className={styles["control"]}
                disabled={!actions.canFavorite}
                onClick={actions.favorite}
              />
            )}
          </Flex>
          <Flex vertical gap="xxs">
            <Waveform
              seed={player.title}
              count={isMobile ? 44 : 72}
              value={position}
              max={duration}
              colored={isPlaying}
              disabled={!player.canSeek}
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
                icon={player.shuffle ? mdiShuffle : mdiShuffleDisabled}
                className={styles["control"]}
                disabled={isUnavailable}
                onClick={() => actions.setShuffle(!player.shuffle)}
              />
              <Button
                outline
                shape="round"
                icon={mdiSkipPrevious}
                className={clsx(styles["control"], styles["large"])}
                disabled={isUnavailable}
                onClick={actions.previous}
              />
              <Button
                shape="round"
                icon={isPlaying ? mdiPause : mdiPlay}
                className={clsx(styles["play"], styles["large"])}
                disabled={isUnavailable}
                onClick={actions.togglePlay}
              />
              <Button
                outline
                shape="round"
                icon={mdiSkipNext}
                className={clsx(styles["control"], styles["large"])}
                disabled={isUnavailable}
                onClick={actions.next}
              />
              <Button
                outline
                shape="round"
                icon={REPEAT_ICONS[repeat]}
                className={styles["control"]}
                disabled={isUnavailable}
                onClick={() => actions.setRepeat(NEXT_REPEAT[repeat])}
              />
            </Flex>
          )}
        </Flex>
        {!isMobile && volumeSlider}
      </Flex>
    </Card>
  )
}
