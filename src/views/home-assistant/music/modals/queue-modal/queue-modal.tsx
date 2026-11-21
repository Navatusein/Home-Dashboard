import {Button, Flex, ModalPopUp, Typography} from "@/shared/ui-kit";
import {mdiMusic, mdiPlaylistPlay} from "@mdi/js";
import {useSearchParams} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {TrackCard} from "@/widgets/home-assistant-cards/track-card";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {useMusicQueue} from "../../hooks/use-music-queue";
import {useQueueTracks} from "../../hooks/use-queue-tracks";
import {useInfiniteScroll} from "@/shared/hooks/use-infinite-scroll";

type Props = {
  player: EntityNameMediaPlayer,
}

export default function QueueModal(props: Props) {
  const searchParams = useSearchParams();

  const queue = useMusicQueue(props.player);
  const isOpen = searchParams.get("modal") == "queue";

  const {first, tracks, hasMore, loadMore, loadEarlier} = useQueueTracks(queue?.queue_id, queue?.current_index, isOpen);
  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <QueryModalControl modal="queue">
      <ModalPopUp.Header title="Queue" icon={mdiPlaylistPlay}/>
      <ModalPopUp.Content>
        <Flex vertical gap="xs">
          {queue?.current_index != null && (
            <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
              Track {queue.current_index + 1} of {queue.items}
            </Typography.Text>
          )}
          {first > 0 && (
            <Button onClick={loadEarlier}>
              Show earlier
            </Button>
          )}
          {tracks.map((track, index) => (
            <TrackCard
              key={track.id}
              title={track.title}
              subtitle={track.artist}
              icon={mdiMusic}
              image={track.image}
              color={first + index == queue?.current_index ? "purple" : undefined}
            />
          ))}
          <div ref={sentinelRef}/>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
