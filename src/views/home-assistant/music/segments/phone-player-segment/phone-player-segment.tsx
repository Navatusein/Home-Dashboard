import {Button, Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiCog, mdiMusic} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import {PhoneNowPlayingCard} from "@/widgets/home-assistant-cards/now-playing-card";
import {NOW_PLAYING_ID} from "../../constants/music-assistant";
import styles from "./phone-player-segment.module.scss";

export default function PhonePlayerSegment() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Flex vertical gap="xs">
      <SegmentHeader icon={mdiMusic} title="Player">
        <Button
          outline
          shape="round"
          icon={mdiCog}
          aria-label="Player settings"
          onClick={() => router.push(`${pathname}?modal=player-settings`)}
        />
      </SegmentHeader>
      <div
        id={NOW_PLAYING_ID}
        className={styles["card"]}
        onClick={(event) => {
          if (!(event.target as Element).closest("button, [data-slot='slider'], [data-interactive]"))
            event.currentTarget.scrollIntoView({behavior: "smooth", block: "start"});
        }}
      >
        <PhoneNowPlayingCard/>
      </div>
    </Flex>
  )
}
