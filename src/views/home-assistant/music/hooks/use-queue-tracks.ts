import {useEffect, useRef, useState} from "react";
import {useHass} from "@hakit/core";
import {Auth} from "home-assistant-js-websocket";
import {MusicTrack} from "../types/types";
import {fetchMusicAssistant} from "../helpers/fetch-music-assistant";

const PAGE_SIZE = 50;
const TRACKS_BEFORE_CURRENT = 10;

type QueueTracks = {
  queueId: string,
  first: number,
  tracks: MusicTrack[],
  hasMore: boolean,
}

function fetchTracks(auth: Auth, queueId: string, offset: number, limit: number) {
  return fetchMusicAssistant<MusicTrack[]>(auth, "queue", {queue_id: queueId, offset: String(offset), limit: String(limit)});
}

export function useQueueTracks(queueId: string | undefined, currentIndex: number | null | undefined, enabled: boolean) {
  const auth = useHass((state) => state.auth);

  const [state, setState] = useState<QueueTracks>();
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !auth || !queueId)
      return;

    const first = Math.max(0, (currentIndex ?? 0) - TRACKS_BEFORE_CURRENT);

    fetchTracks(auth, queueId, first, PAGE_SIZE)
      .then((tracks) => setState({queueId: queueId, first: first, tracks: tracks, hasMore: tracks.length == PAGE_SIZE}))
      .catch(console.error);
  }, [auth, queueId, currentIndex, enabled]);

  const current = state?.queueId == queueId ? state : undefined;

  const loadMore = () => {
    if (!auth || !current || loadingRef.current)
      return;

    loadingRef.current = true;

    fetchTracks(auth, current.queueId, current.first + current.tracks.length, PAGE_SIZE)
      .then((tracks) => setState({...current, tracks: [...current.tracks, ...tracks], hasMore: tracks.length == PAGE_SIZE}))
      .catch(console.error)
      .finally(() => loadingRef.current = false);
  }

  const loadEarlier = () => {
    if (!auth || !current || current.first == 0)
      return;

    const first = Math.max(0, current.first - PAGE_SIZE);

    fetchTracks(auth, current.queueId, first, current.first - first)
      .then((tracks) => setState({...current, first: first, tracks: [...tracks, ...current.tracks]}))
      .catch(console.error);
  }

  return {
    first: current?.first ?? 0,
    tracks: current?.tracks ?? [],
    hasMore: current?.hasMore ?? false,
    loadMore: loadMore,
    loadEarlier: loadEarlier,
  };
}
