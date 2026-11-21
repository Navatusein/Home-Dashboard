import {NextRequest, NextResponse} from "next/server";
import {MusicAssistantTrack, musicAssistantImageUrl, musicAssistantRequest, toMusicTrack} from "../helpers/music-assistant-request";

const MAX_LIMIT = 100;

type MusicAssistantQueueItem = {
  queue_item_id: string,
  name: string,
  image?: {proxy_id?: string} | null,
  media_item?: MusicAssistantTrack | null,
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const queueId = params.get("queue_id");
  const offset = Math.max(0, Number(params.get("offset")) || 0);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(params.get("limit")) || MAX_LIMIT));

  if (!queueId)
    return NextResponse.json({error: "queue_id is required"}, {status: 400});

  return musicAssistantRequest<MusicAssistantQueueItem[]>(
    request,
    "player_queues/items",
    {queue_id: queueId, limit: limit, offset: offset},
    (items, musicAssistantUrl) => items.map((item) => item.media_item
      ? toMusicTrack(item.queue_item_id, {...item.media_item, image: item.image ?? item.media_item.image}, musicAssistantUrl)
      : {id: item.queue_item_id, uri: "", title: item.name, artist: "", image: musicAssistantImageUrl(item.image, musicAssistantUrl)}
    ),
  );
}
