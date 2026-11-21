import {RepeatMode} from "@/shared/native/dashboard-plugin";

export type NowPlaying = {
  available: boolean,
  playing: boolean,
  canSeek: boolean,
  title: string,
  subtitle: string,
  image?: string,
  position: number,
  positionAt: number,
  duration: number,
  volume: number,
  shuffle: boolean,
  repeat: RepeatMode,
}

export type NowPlayingActions = {
  togglePlay: () => void,
  previous: () => void,
  next: () => void,
  seek: (position: number) => void,
  setVolume: (volume: number) => void,
  setShuffle: (shuffle: boolean) => void,
  setRepeat: (repeat: RepeatMode) => void,
  favorite?: () => void,
  canFavorite?: boolean,
}
