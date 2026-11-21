import {usePhonePlayer} from "@/shared/hooks/use-phone-player";
import {Dashboard} from "@/shared/native/dashboard-plugin";
import {nativeImage} from "@/shared/native/native-image";
import NowPlayingCard from "../now-playing-card/now-playing-card";

export default function PhoneNowPlayingCard() {
  const state = usePhonePlayer();

  const hasMedia = !!state?.active && !!state.title;

  return (
    <NowPlayingCard
      player={{
        available: !!state,
        playing: !!state?.playing,
        canSeek: hasMedia && state.duration > 0,
        title: hasMedia ? state.title! : "Nothing playing",
        subtitle: [state?.artist, state?.album].filter(Boolean).join(" · ") || "Phone",
        image: hasMedia ? nativeImage(state.image) : undefined,
        position: state?.position ?? 0,
        positionAt: state?.positionAt ?? 0,
        duration: state?.duration ?? 0,
        volume: state?.volume ?? 0,
        shuffle: !!state?.shuffle,
        repeat: state?.repeat ?? "off",
      }}
      actions={{
        togglePlay: () => Dashboard.togglePlay(),
        previous: () => Dashboard.previous(),
        next: () => Dashboard.next(),
        seek: (position) => Dashboard.seek({position: position}),
        setVolume: (volume) => Dashboard.setVolume({volume: volume}),
        setShuffle: (shuffle) => Dashboard.setShuffle({shuffle: shuffle}),
        setRepeat: (repeat) => Dashboard.setRepeat({repeat: repeat}),
      }}
    />
  )
}
