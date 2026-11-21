import {PluginListenerHandle, registerPlugin} from "@capacitor/core";

export type PlayerState = {
  playing: boolean;
  active: boolean;
  title?: string;
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
  start(): Promise<void>;
  stop(): Promise<void>;
  status(): Promise<PlayerState>;
  addListener(event: "playerState", listener: (state: PlayerState) => void): Promise<PluginListenerHandle>;
}

export const Dashboard = registerPlugin<DashboardPlugin>("Dashboard");
