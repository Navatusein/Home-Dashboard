interface ScreenOrientation {
  lock(orientation: "any" | "natural" | "landscape" | "portrait" | OrientationType): Promise<void>;
}
