import {MusicTrack} from "../types/types";

export function filterTracks(tracks: MusicTrack[], search: string, sort: string) {
  const query = search.trim().toLowerCase();

  const filtered = query
    ? tracks.filter((track) => track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query))
    : tracks;

  if (sort == "title")
    return filtered.toSorted((a, b) => a.title.localeCompare(b.title));

  if (sort == "artist")
    return filtered.toSorted((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));

  return filtered;
}
