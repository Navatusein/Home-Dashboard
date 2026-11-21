import {useEffect, useState} from "react";
import {useHass} from "@hakit/core";
import {MusicTrack} from "../types/types";
import {fetchMusicAssistant} from "../helpers/fetch-music-assistant";

export function useCollectionTracks(uri: string | null) {
  const auth = useHass((state) => state.auth);

  const [state, setState] = useState<{uri: string, tracks: MusicTrack[]}>();

  useEffect(() => {
    if (!auth || !uri)
      return;

    fetchMusicAssistant<MusicTrack[]>(auth, "tracks", {uri: uri})
      .then((tracks) => setState({uri: uri, tracks: tracks}))
      .catch(console.error);
  }, [auth, uri]);

  return state && state.uri == uri ? state.tracks : undefined;
}
