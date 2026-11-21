"use client";

import {useSyncExternalStore} from "react";
import {Capacitor} from "@capacitor/core";

const subscribe = () => () => {};

export function useIsNative() {
  return useSyncExternalStore(subscribe, () => Capacitor.isNativePlatform(), () => false);
}
