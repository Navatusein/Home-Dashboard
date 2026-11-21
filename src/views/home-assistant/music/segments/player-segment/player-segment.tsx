import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiCastAudio, mdiMusic, mdiPlaylistPlay, mdiSpeakerMultiple} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import {NowPlayingCard} from "@/widgets/home-assistant-cards/now-playing-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {useEntity} from "@/shared/hooks/use-entity";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {useMusicQueue} from "../../hooks/use-music-queue";
import {NOW_PLAYING_ID} from "../../constants/music-assistant";
import styles from "./player-segment.module.scss";

type Props = {
  player: EntityNameMediaPlayer,
}

export default function PlayerSegment(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const entity = useEntity(props.player);
  const isMobile = useBreakpoint("sm");
  const queue = useMusicQueue(props.player);

  const members: string[] = entity.attributes.group_members ?? [];

  const queueCard = (
    <StateCard
      tall={isMobile}
      title="Queue"
      text={queue?.current_index != null ? `${queue.current_index + 1} / ${queue.items}` : "--"}
      icon={mdiPlaylistPlay}
      onClick={() => router.push(`${pathname}?modal=queue`)}
    />
  );

  return (
    <Flex vertical gap="xs">
      <SegmentHeader icon={mdiMusic} title="Player"/>
      <div
        id={NOW_PLAYING_ID}
        className={styles["card"]}
        onClick={(event) => {
          if (!(event.target as Element).closest("button, [data-slot='slider'], [data-interactive]"))
            event.currentTarget.scrollIntoView({behavior: "smooth", block: "start"});
        }}
      >
        <NowPlayingCard entity={props.player}/>
      </div>
      <Grid columns={isMobile ? 2 : 3} gap="xs">
        {isMobile ? (
          <Grid.Element rowSpan={2}>
            {queueCard}
          </Grid.Element>
        ) : queueCard}
        <StateCard
          title="Transfer"
          text="Move"
          icon={mdiCastAudio}
          onClick={() => router.push(`${pathname}?modal=transfer`)}
        />
        <StateCard
          title="Group"
          text={members.length > 1 ? `${members.length} Players` : "Solo"}
          icon={mdiSpeakerMultiple}
          color={members.length > 1 ? "purple" : undefined}
          onClick={() => router.push(`${pathname}?modal=group`)}
        />
      </Grid>
    </Flex>
  )
}
