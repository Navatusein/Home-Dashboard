import {FC, SVGProps} from "react";
import {
  EntityNameBinarySensor,
  EntityNameButton,
  EntityNameNumber,
  EntityNameSensor,
  EntityNameSwitch
} from "@/shared/types/ha-domains";
import DevicesPcIcon from "@public/icons/devices-and-networks/devices-pc.svg";
import DeviceLaptopIcon from "@public/icons/devices-and-networks/device-laptop.svg";
import BrandAppleIcon from "@public/icons/brands/brand-apple.svg";

export type TerminalDevice = {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  agentRunning: EntityNameBinarySensor;
  volume: EntityNameNumber;
  mute: EntityNameSwitch;
  nowPlaying: EntityNameSensor;
  mediaPlaying: EntityNameBinarySensor;
  mediaPlayPause: EntityNameButton;
  mediaNextTrack: EntityNameButton;
  mediaPreviousTrack: EntityNameButton;
  discordMute: EntityNameSwitch;
  discordDeafen: EntityNameSwitch;
  discordVoiceChannel: EntityNameBinarySensor;
  discordPluginStatus: EntityNameBinarySensor;
}

export const TERMINAL_DEVICES = {
  pc: {
    title: "PC",
    icon: DevicesPcIcon,
    agentRunning: "binary_sensor.navatusein_pc_agent_running",
    volume: "number.navatusein_pc_windows_volume",
    mute: "switch.navatusein_pc_windows_mute",
    nowPlaying: "sensor.navatusein_pc_now_playing",
    mediaPlaying: "binary_sensor.navatusein_pc_media_playing",
    mediaPlayPause: "button.navatusein_pc_media_play_pause",
    mediaNextTrack: "button.navatusein_pc_media_next_track",
    mediaPreviousTrack: "button.navatusein_pc_media_previous_track",
    discordMute: "switch.navatusein_pc_discord_mute",
    discordDeafen: "switch.navatusein_pc_discord_deafen",
    discordVoiceChannel: "binary_sensor.navatusein_pc_discord_voice_channel",
    discordPluginStatus: "binary_sensor.navatusein_pc_discord_plugin_status",
  },
  laptop: {
    title: "Laptop",
    icon: DeviceLaptopIcon,
    agentRunning: "binary_sensor.navatusein_work_laptop_agent_running",
    volume: "number.navatusein_work_laptop_windows_volume",
    mute: "switch.navatusein_work_laptop_windows_mute",
    nowPlaying: "sensor.navatusein_work_laptop_now_playing",
    mediaPlaying: "binary_sensor.navatusein_work_laptop_media_playing",
    mediaPlayPause: "button.navatusein_work_laptop_media_play_pause",
    mediaNextTrack: "button.navatusein_work_laptop_media_next_track",
    mediaPreviousTrack: "button.navatusein_work_laptop_media_previous_track",
    discordMute: "switch.navatusein_work_laptop_discord_mute",
    discordDeafen: "switch.navatusein_work_laptop_discord_deafen",
    discordVoiceChannel: "binary_sensor.navatusein_work_laptop_discord_voice_channel",
    discordPluginStatus: "binary_sensor.navatusein_work_laptop_discord_plugin_status",
  },
  mac: {
    title: "Mac",
    icon: BrandAppleIcon,
    agentRunning: "binary_sensor.navatusein_macbook_agent_running",
    volume: "number.navatusein_macbook_mac_volume",
    mute: "switch.navatusein_macbook_mac_mute",
    nowPlaying: "sensor.navatusein_macbook_now_playing",
    mediaPlaying: "binary_sensor.navatusein_macbook_media_playing",
    mediaPlayPause: "button.navatusein_macbook_media_play_pause",
    mediaNextTrack: "button.navatusein_macbook_media_next_track",
    mediaPreviousTrack: "button.navatusein_macbook_media_previous_track",
    discordMute: "switch.navatusein_macbook_discord_mute",
    discordDeafen: "switch.navatusein_macbook_discord_deafen",
    discordVoiceChannel: "binary_sensor.navatusein_macbook_discord_voice_channel",
    discordPluginStatus: "binary_sensor.navatusein_macbook_discord_plugin_status",
  },
} satisfies Record<string, TerminalDevice>;

export type TerminalMode = keyof typeof TERMINAL_DEVICES;

export const TERMINAL_MODES = Object.keys(TERMINAL_DEVICES) as TerminalMode[];
