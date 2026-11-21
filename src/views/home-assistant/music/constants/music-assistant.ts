import {mdiAccountMusic, mdiAlbum, mdiPlaylistMusic} from "@mdi/js";

export const MUSIC_ASSISTANT_CONFIG_ENTRY = "01M7G3VE9J4CXGTB7VVB9K6M1P";

export const MEDIA_TYPE_ICONS = {playlist: mdiPlaylistMusic, album: mdiAlbum, artist: mdiAccountMusic};

export const LIBRARY_SORTS = [
  {key: "sort_name", label: "Name A–Z", value: "sort_name"},
  {key: "sort_name_desc", label: "Name Z–A", value: "sort_name_desc"},
  {key: "timestamp_added_desc", label: "Recently added", value: "timestamp_added_desc"},
  {key: "last_played_desc", label: "Recently played", value: "last_played_desc"},
  {key: "play_count_desc", label: "Most played", value: "play_count_desc"},
  {key: "random", label: "Random", value: "random"},
];

export const ALBUM_SORTS = [
  ...LIBRARY_SORTS,
  {key: "year_desc", label: "Year", value: "year_desc"},
  {key: "artist_name", label: "Artist", value: "artist_name"},
];

export const TRACK_SORTS = [
  {key: "original", label: "Original order", value: "original"},
  {key: "title", label: "Title A–Z", value: "title"},
  {key: "artist", label: "Artist A–Z", value: "artist"},
];

export const NAVIDROME_QUALITIES = [
  {key: "opus128", label: "Opus 128 kbps", value: "opus128"},
  {key: "opus192", label: "Opus 192 kbps", value: "opus192"},
  {key: "raw", label: "Original (FLAC)", value: "raw"},
];
