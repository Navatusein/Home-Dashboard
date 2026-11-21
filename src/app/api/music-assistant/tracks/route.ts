import {NextRequest, NextResponse} from "next/server";
import {MusicAssistantTrack, musicAssistantRequest, toMusicTrack} from "../helpers/music-assistant-request";

const COMMANDS: Record<string, string> = {
  playlist: "music/playlists/playlist_tracks",
  album: "music/albums/album_tracks",
  artist: "music/artists/artist_tracks",
};

export async function GET(request: NextRequest) {
  const match = /^([^:]+):\/\/(playlist|album|artist)\/(.+)$/.exec(request.nextUrl.searchParams.get("uri") ?? "");

  if (!match)
    return NextResponse.json({error: "uri must point to a playlist, album or artist"}, {status: 400});

  const [, provider, mediaType, itemId] = match;

  return musicAssistantRequest<MusicAssistantTrack[]>(
    request,
    COMMANDS[mediaType],
    {item_id: itemId, provider_instance_id_or_domain: provider},
    (tracks, musicAssistantUrl) => tracks.map((track, index) => toMusicTrack(`${index}-${track.uri}`, track, musicAssistantUrl)),
  );
}
