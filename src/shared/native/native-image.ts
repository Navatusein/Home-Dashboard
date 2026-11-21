import {Capacitor} from "@capacitor/core";

export function nativeImage(src?: string | null) {
  return src?.startsWith("file://") ? Capacitor.convertFileSrc(src) : src ?? undefined;
}
