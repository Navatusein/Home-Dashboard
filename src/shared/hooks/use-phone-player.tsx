"use client";

import {useEffect, useState} from "react";
import {Dashboard, PlayerState} from "@/shared/native/dashboard-plugin";

export function usePhonePlayer() {
  const [state, setState] = useState<PlayerState>();

  useEffect(() => {
    Dashboard.status().then(setState).catch(console.error);

    const handle = Dashboard.addListener("playerState", setState);
    return () => {
      handle.then((listener) => listener.remove());
    }
  }, []);

  return state;
}
