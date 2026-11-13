"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton, BaseButtonColors} from "@/widgets/terminal-buttons/base-button";
import BrandSpotifyIcon from "@public/icons/brands/brand-spotify.svg";
import PlayerSkipBackIcon from "@public/icons/media/player-skip-back.svg";
import PlayerPlayIcon from "@public/icons/media/player-play.svg";
import PlayPauseIcon from "@public/icons/media/player-pause.svg";
import PlayerSkipForwardIcon from "@public/icons/media/player-skip-forward.svg";
import {isOffState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import {FC, SVGProps} from "react";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {useTerminalDevice} from "@/shared/hooks/use-terminal-device";

type Option = {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  color: BaseButtonColors;
}

const LOCALSTORAGE_KEYS = "media-player-segment";

const SPOTIFY_MODE = "spotify";
const WINDOWS_MODE = "windows";

const SPOTIFY_OPTION: Option = {icon: BrandSpotifyIcon, title: "Spotify", color: "green"};

const MODES = [SPOTIFY_MODE, WINDOWS_MODE] as const;

const windowsPlayerState = (state: string) => {
  if (state == "unavailable" || state == "Nothing playing") {
    return '-'
  }

  return state
}

export default function MediaPlayerSegment() {
  const [mode, setMode] = useLocalStorage<(typeof MODES)[number]>(LOCALSTORAGE_KEYS, SPOTIFY_MODE)

  const spotifyMediaEntity = useEntity("media_player.spotify_navatusein");

  const {device} = useTerminalDevice();

  const windowsNowPlayingSensor = useEntity(device.nowPlaying);
  const windowsIsPlayingBinarySensor = useEntity(device.mediaPlaying);
  const windowsNextTrackButton = useEntity(device.mediaNextTrack);
  const windowsPreviousTrackButton = useEntity(device.mediaPreviousTrack);
  const windowsPlayPauseButton = useEntity(device.mediaPlayPause);

  const option: Option = mode == SPOTIFY_MODE ? SPOTIFY_OPTION : {icon: device.icon, title: device.title, color: "blue"};

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
          title={option.title}
          icon={option.icon}
          color={option.color}
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
          <AgentDisabledProvider entity={device.agentRunning}>
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
