"use client";

import {useEffect, useState} from "react";
import {Dashboard, DownloadedCollection} from "@/shared/native/dashboard-plugin";

export function useDownloads() {
  const [collections, setCollections] = useState<DownloadedCollection[]>();

  useEffect(() => {
    const load = () => Dashboard.getDownloads().then((result) => setCollections(result.collections)).catch(console.error);

    load();

    const handle = Dashboard.addListener("downloadsChanged", load);
    return () => {
      handle.then((listener) => listener.remove());
    }
  }, []);

  return collections;
}
