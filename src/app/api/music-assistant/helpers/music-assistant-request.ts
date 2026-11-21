import {NextRequest, NextResponse} from "next/server";
import {MusicTrack} from "@/views/home-assistant/music/types/types";
import {isHomeAssistantUser} from "./is-home-assistant-user";

type MusicAssistantImage = {proxy_id?: string} | null | undefined;

export type MusicAssistantTrack = {
  uri: string,
  name: string,
  image?: MusicAssistantImage,
  artists?: {name: string}[],
  album?: {image?: MusicAssistantImage} | null,
  metadata?: {images?: MusicAssistantImage[] | null},
}

export async function musicAssistantRequest<T>(request: NextRequest, command: string, args: object, map: (result: T, musicAssistantUrl: string) => unknown) {
  const musicAssistantUrl = process.env.MUSIC_ASSISTANT_URL;
  const musicAssistantToken = process.env.MUSIC_ASSISTANT_TOKEN;

  if (!musicAssistantUrl || !musicAssistantToken)
    return NextResponse.json({error: "Music Assistant is not configured"}, {status: 503});

  if (!await isHomeAssistantUser(request.headers.get("authorization")))
    return NextResponse.json({error: "Unauthorized"}, {status: 401});

  const response = await fetch(new URL("/api", musicAssistantUrl), {
    method: "POST",
    headers: {Authorization: `Bearer ${musicAssistantToken}`, "Content-Type": "application/json"},
    body: JSON.stringify({message_id: command, command: command, args: args}),
  });

  if (!response.ok)
    return NextResponse.json({error: "Music Assistant request failed"}, {status: 502});

  return NextResponse.json(map(await response.json(), musicAssistantUrl));
}

export function musicAssistantImageUrl(image: MusicAssistantImage, musicAssistantUrl: string) {
  return image?.proxy_id ? new URL(`/imageproxy/${image.proxy_id}?size=256`, musicAssistantUrl).href : null;
}

export function toMusicTrack(id: string, track: MusicAssistantTrack, musicAssistantUrl: string): MusicTrack {
  const image = track.image ?? track.metadata?.images?.[0] ?? track.album?.image;

  return {
    id: id,
    uri: track.uri,
    title: track.name,
    artist: [...new Set(track.artists?.map((artist) => artist.name))].join(", "),
    image: musicAssistantImageUrl(image, musicAssistantUrl),
  };
}
