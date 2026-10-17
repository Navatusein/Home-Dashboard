"use client"

import {useEffect} from "react";

export default function OrientationLock() {
  useEffect(() => {
    if (Math.min(screen.width, screen.height) >= 600)
      return;

    screen.orientation.lock("portrait").catch(() => {});
  }, []);

  return null;
}
