import {useEffect, useState} from "react";
import {isUnavailableState, useHass} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {MusicQueue} from "../types/types";

export function useMusicQueue(player: EntityNameMediaPlayer) {
  const callService = useHass((state) => state.helpers.callService);
  const entity = useEntity(player);

  const [queue, setQueue] = useState<{player: EntityNameMediaPlayer, queue: MusicQueue}>();

  const track = entity.attributes.media_content_id;
  const isUnavailable = isUnavailableState(entity.state);

  useEffect(() => {
    if (isUnavailable)
      return;

    callService<Record<string, MusicQueue>, "musicAssistant", "getQueue">({
      domain: "musicAssistant",
      service: "getQueue",
      target: player,
      returnResponse: true,
    })
      .then((result) => setQueue({player: player, queue: result.response[player]}))
      .catch(console.error);
  }, [callService, player, track, isUnavailable]);

  if (isUnavailable)
    return undefined;

  return queue?.player == player ? queue.queue : undefined;
}
