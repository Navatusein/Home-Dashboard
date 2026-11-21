import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {PHONE_PLAYER} from "../constants/music-assistant";

export type MusicPlayerId = EntityNameMediaPlayer | typeof PHONE_PLAYER;

export type LibraryMediaType = "playlist" | "album" | "artist";

export type LibraryItem = {
  media_type: LibraryMediaType,
  uri: string,
  name: string,
  version: string,
  image?: string | null,
}

export type QueueItem = {
  name: string,
  media_item?: {
    name: string,
    artists?: {name: string}[],
  },
}

export type MusicTrack = {
  id: string,
  uri: string,
  navidromeId: string | null,
  title: string,
  artist: string,
  image: string | null,
}

export type MusicQueue = {
  queue_id: string,
  items: number,
  current_index: number | null,
  current_item: QueueItem | null,
  next_item: QueueItem | null,
}
