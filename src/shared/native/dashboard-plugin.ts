import {PluginListenerHandle, registerPlugin} from "@capacitor/core";

export type RepeatMode = "off" | "all" | "one";

export type PlayerState = {
  playing: boolean;
  active: boolean;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
  position: number;
  positionAt: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
  index: number;
  count: number;
  volume: number;
}

export type PhoneQueueItem = {
  id: string;
  title?: string;
  artist?: string;
  image?: string;
}

export type NativeTrack = {
  id: string;
  title: string;
  artist: string;
  image: string | null;
}

export type DownloadedTrack = NativeTrack & {
  cover: string | null;
  downloaded: boolean;
}

export type DownloadedCollection = {
  id: string;
  name: string;
  tracks: DownloadedTrack[];
}

export type NavidromeSettings = {
  url?: string;
  username?: string;
  quality: string;
  hasPassword: boolean;
}

export interface DashboardPlugin {
  getVersion(): Promise<{version: string}>;
  getServer(): Promise<{dashboardUrl?: string, homeAssistantHost?: string}>;
  saveServer(options: {dashboardUrl: string, homeAssistantHost?: string}): Promise<void>;
  openSetup(): Promise<void>;
  getNavidrome(): Promise<NavidromeSettings>;
  saveNavidrome(options: {url: string, username: string, password?: string, quality: string}): Promise<void>;
  checkNavidrome(): Promise<{ok: boolean, error?: string}>;
  play(options: {tracks: NativeTrack[], startIndex: number}): Promise<void>;
  stop(): Promise<void>;
  togglePlay(): Promise<void>;
  next(): Promise<void>;
  previous(): Promise<void>;
  seek(options: {position: number}): Promise<void>;
  setShuffle(options: {shuffle: boolean}): Promise<void>;
  setRepeat(options: {repeat: RepeatMode}): Promise<void>;
  setVolume(options: {volume: number}): Promise<void>;
  getQueue(): Promise<{items: PhoneQueueItem[], index: number}>;
  playIndex(options: {index: number}): Promise<void>;
  download(options: {id: string, name: string, tracks: NativeTrack[]}): Promise<void>;
  removeDownload(options: {id: string}): Promise<void>;
  getDownloads(): Promise<{collections: DownloadedCollection[]}>;
  status(): Promise<PlayerState>;
  addListener(event: "playerState", listener: (state: PlayerState) => void): Promise<PluginListenerHandle>;
  addListener(event: "downloadsChanged", listener: () => void): Promise<PluginListenerHandle>;
}

export const Dashboard = registerPlugin<DashboardPlugin>("Dashboard");
