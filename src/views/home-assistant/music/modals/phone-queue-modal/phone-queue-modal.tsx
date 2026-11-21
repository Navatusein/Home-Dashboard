import {useEffect, useState} from "react";
import {Button, Flex, ModalPopUp, Typography} from "@/shared/ui-kit";
import {mdiMusic, mdiPlaylistPlay} from "@mdi/js";
import {useSearchParams} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {TrackCard} from "@/widgets/home-assistant-cards/track-card";
import {usePhonePlayer} from "@/shared/hooks/use-phone-player";
import {useInfiniteScroll} from "@/shared/hooks/use-infinite-scroll";
import {Dashboard, PhoneQueueItem} from "@/shared/native/dashboard-plugin";
import {nativeImage} from "@/shared/native/native-image";

const PAGE_SIZE = 50;
const TRACKS_BEFORE_CURRENT = 10;

export default function PhoneQueueModal() {
  const searchParams = useSearchParams();
  const state = usePhonePlayer();

  const isOpen = searchParams.get("modal") == "phone-queue";
  const index = state?.index ?? 0;
  const count = state?.count ?? 0;

  const [queue, setQueue] = useState<{items: PhoneQueueItem[], index: number}>();

  useEffect(() => {
    if (!isOpen)
      return;

    Dashboard.getQueue().then(setQueue).catch(console.error);
  }, [isOpen, index, count]);

  const key = `${queue?.index}|${queue?.items.length}`;
  const [view, setView] = useState({key: "", first: 0, size: PAGE_SIZE});
  const current = view.key == key ? view : {key: key, first: Math.max(0, (queue?.index ?? 0) - TRACKS_BEFORE_CURRENT), size: PAGE_SIZE};

  const items = queue?.items ?? [];
  const last = Math.min(items.length, current.first + current.size);

  const sentinelRef = useInfiniteScroll(
    () => setView({...current, size: current.size + PAGE_SIZE}),
    last < items.length
  );

  const showEarlier = () => {
    const first = Math.max(0, current.first - PAGE_SIZE);
    setView({key: key, first: first, size: current.size + current.first - first});
  }

  return (
    <QueryModalControl modal="phone-queue">
      <ModalPopUp.Header title="Phone Queue" icon={mdiPlaylistPlay}/>
      <ModalPopUp.Content>
        <Flex vertical gap="xs">
          {queue && (
            <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
              {items.length ? `Track ${queue.index + 1} of ${items.length}` : "The queue is empty"}
            </Typography.Text>
          )}
          {current.first > 0 && (
            <Button onClick={showEarlier}>
              Show earlier
            </Button>
          )}
          {items.slice(current.first, last).map((item, offset) => (
            <TrackCard
              key={`${current.first + offset}-${item.id}`}
              title={item.title ?? "Unknown"}
              subtitle={item.artist ?? ""}
              icon={mdiMusic}
              image={nativeImage(item.image)}
              color={current.first + offset == queue?.index ? "purple" : undefined}
              onClick={() => Dashboard.playIndex({index: current.first + offset})}
            />
          ))}
          <div ref={sentinelRef}/>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
