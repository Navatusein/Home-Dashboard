"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton, BaseButtonColors} from "@/widgets/terminal-buttons/base-button";
import BrandSpotifyIcon from "@public/icons/brands/brand-spotify.svg";
import PlayerSkipBackIcon from "@public/icons/media/player-skip-back.svg";
import PlayerPlayIcon from "@public/icons/media/player-play.svg";
import PlayPauseIcon from "@public/icons/media/player-pause.svg";
import PlayerSkipForwardIcon from "@public/icons/media/player-skip-forward.svg";
import BrandWindowsIcon from "@public/icons/brands/brand-windows.svg";
import {isOffState, useEntity} from "@hakit/core";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import {FC, SVGProps} from "react";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

type Option = {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  color: BaseButtonColors;
}

const LOCALSTORAGE_KEYS = "media-player-segment";

const SPOTIFY_MODE = "spotify";
const WINDOWS_MODE = "windows";

const OPTIONS_BY_MODE: {[key: string]: Option} = {
  [SPOTIFY_MODE]: {icon: BrandSpotifyIcon, title: "Spotify", color: "green"},
  [WINDOWS_MODE]: {icon: BrandWindowsIcon, title: "Windows", color: "blue"},
}

const MODES = [SPOTIFY_MODE, WINDOWS_MODE] as const;

const windowsPlayerState = (state: string) => {
  if (state == "unavailable" || state == "Nothing playing") {
    return '-'
  }

  return state
}

export default function SegmentMediaPlayer() {
  const [mode, setMode] = useLocalStorage<(typeof MODES)[number]>(LOCALSTORAGE_KEYS, SPOTIFY_MODE)

  const spotifyMediaEntity = useEntity("media_player.spotify_navatusein");

  const windowsNowPlayingSensor = useEntity("sensor.navatusein_pc_now_playing");
  const windowsIsPlayingBinarySensor = useEntity("binary_sensor.navatusein_pc_media_playing");
  const windowsNextTrackButton = useEntity("button.navatusein_pc_media_next_track");
  const windowsPreviousTrackButton = useEntity("button.navatusein_pc_media_previous_track");
  const windowsPlayPauseButton = useEntity("button.navatusein_pc_media_play_pause");

  const windowsIsPlayingOff = isOffState(windowsIsPlayingBinarySensor.state);

  const switchToNextMode = () => {
    setMode((currentMode) => {
      const currentIndex = MODES.indexOf(currentMode);
      const nextIndex = (currentIndex + 1) % MODES.length;

      return MODES[nextIndex];
    });
  };

  return (
    <>
      <Grid.Section rowStart={7} colStart={1} direction="horizontal">
        <BaseButton
          title={OPTIONS_BY_MODE[mode].title}
          icon={OPTIONS_BY_MODE[mode].icon}
          color={OPTIONS_BY_MODE[mode].color}
          onClickAction={() => switchToNextMode()}
        />
      </Grid.Section>

      {mode === SPOTIFY_MODE && (
        <>
          <Grid.Section rowStart={6} colStart={1} direction="horizontal">
            <BaseButton
              colSpan={4}
              title={spotifyMediaEntity.state == "idle" ? "-" : `${spotifyMediaEntity.attributes.media_artist} - ${spotifyMediaEntity.attributes.media_title}`}
            />
          </Grid.Section>
          <Grid.Section rowStart={7} colStart={2} direction="horizontal">
            <BaseButton
              icon={PlayerSkipBackIcon}
              onClickAction={() => spotifyMediaEntity.service.mediaPreviousTrack()}
            />
            <BaseButton
              icon={spotifyMediaEntity.state == "playing" ? PlayPauseIcon : PlayerPlayIcon}
              onClickAction={() => {
                if (spotifyMediaEntity.state == "idle") {
                  spotifyMediaEntity.service.selectSource({serviceData: {source: "NAVATUSEINPC"}})
                }
                else {
                  spotifyMediaEntity.service.mediaPlayPause()
                }
              }}
            />
            <BaseButton
              icon={PlayerSkipForwardIcon}
              onClickAction={() => spotifyMediaEntity.service.mediaNextTrack()}
            />
          </Grid.Section>
        </>
      )}
      {mode === WINDOWS_MODE && (
        <>
          <AgentDisabledProvider>
            <Grid.Section rowStart={6} colStart={1} direction="horizontal">
              <BaseButton
                colSpan={4}
                title={windowsPlayerState(windowsNowPlayingSensor.state)}
                textWrap
              />
            </Grid.Section>
            <Grid.Section rowStart={7} colStart={2} direction="horizontal">
              <BaseButton
                icon={PlayerSkipBackIcon}
                onClickAction={() => windowsPreviousTrackButton.service.press()}
              />
              <BaseButton
                icon={windowsIsPlayingOff ? PlayerPlayIcon : PlayPauseIcon}
                onClickAction={() => windowsPlayPauseButton.service.press()}
              />
              <BaseButton
                icon={PlayerSkipForwardIcon}
                onClickAction={() => windowsNextTrackButton.service.press()}
              />
            </Grid.Section>
          </AgentDisabledProvider>
        </>
      )}
    </>
  )
}
