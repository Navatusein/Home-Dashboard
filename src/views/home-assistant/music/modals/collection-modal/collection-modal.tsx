import {useState} from "react";
import {Button, Flex, Input, ModalPopUp, Select, Typography} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import {mdiCellphone, mdiMagnify, mdiMusic, mdiPlay} from "@mdi/js";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {TrackCard} from "@/widgets/home-assistant-cards/track-card";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {MEDIA_TYPE_ICONS, TRACK_SORTS} from "../../constants/music-assistant";
import {LibraryMediaType, MusicTrack} from "../../types/types";
import {useCollectionTracks} from "../../hooks/use-collection-tracks";
import {useInfiniteScroll} from "@/shared/hooks/use-infinite-scroll";
import {useIsNative} from "@/shared/hooks/use-is-native";
import {Dashboard} from "@/shared/native/dashboard-plugin";
import {filterTracks} from "../../helpers/filter-tracks";

const PAGE_SIZE = 50;

type Props = {
  player: EntityNameMediaPlayer,
}

export default function CollectionModal(props: Props) {
  const callService = useHass((state) => state.helpers.callService);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNative = useIsNative();

  const isOpen = searchParams.get("modal") == "collection";
  const uri = isOpen ? searchParams.get("uri") : null;
  const mediaType = (/^[^:]+:\/\/(\w+)\//.exec(uri ?? "")?.[1] ?? "playlist") as LibraryMediaType;

  const tracks = useCollectionTracks(uri);

  const [filter, setFilter] = useState({uri: uri, search: "", sort: "original"});
  const {search, sort} = filter.uri == uri ? filter : {search: "", sort: "original"};

  const shownTracks = tracks ? filterTracks(tracks, search, sort) : undefined;

  const visibleKey = `${uri}|${search}|${sort}`;
  const [visible, setVisible] = useState({key: visibleKey, count: PAGE_SIZE});
  const visibleCount = visible.key == visibleKey ? visible.count : PAGE_SIZE;

  const sentinelRef = useInfiniteScroll(
    () => setVisible({key: visibleKey, count: visibleCount + PAGE_SIZE}),
    !!shownTracks && shownTracks.length > visibleCount
  );

  const play = (mediaId: string, media_type: string, startItem?: string) => {
    callService({
      domain: "musicAssistant",
      service: "playMedia",
      target: props.player,
      serviceData: {media_id: mediaId, media_type: media_type, ...(startItem && {start_item: startItem})},
    });

    router.push(pathname);
  }

  const playOnPhone = () => {
    const playable = (tracks ?? [])
      .filter((track) => track.navidromeId)
      .map((track) => ({id: track.navidromeId!, title: track.title, artist: track.artist, image: track.image}));

    Dashboard.play({tracks: playable, startIndex: 0}).catch(console.error);
    router.push(pathname);
  }

  const playTrack = (track: MusicTrack) => {
    if (mediaType == "artist")
      play(track.uri, "track");
    else
      play(uri!, mediaType, track.uri);
  }

  return (
    <QueryModalControl modal="collection">
      <ModalPopUp.Header title={searchParams.get("name") ?? "Library"} icon={MEDIA_TYPE_ICONS[mediaType]}>
        <Flex vertical gap="xs">
          <Flex justify="center" gap="xs">
            <Button color="purple" icon={mdiPlay} disabled={!uri} onClick={() => play(uri!, mediaType)}>
              Play All
            </Button>
            {isNative && (
              <Button icon={mdiCellphone} disabled={!tracks} onClick={playOnPhone}>
                Phone
              </Button>
            )}
          </Flex>
          <Flex gap="xs">
            <Input
              icon={mdiMagnify}
              placeholder="Search"
              style={{flex: 1}}
              value={search}
              onChange={(event) => setFilter({uri: uri, search: event.target.value, sort: sort})}
              onClear={() => setFilter({uri: uri, search: "", sort: sort})}
            />
            <Select items={TRACK_SORTS} value={sort} onValueChange={(value) => setFilter({uri: uri, search: search, sort: value})}/>
          </Flex>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="xs">
          {tracks && shownTracks && (
            <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
              {shownTracks.length == tracks.length ? `${tracks.length} tracks` : `${shownTracks.length} of ${tracks.length} tracks`}
            </Typography.Text>
          )}
          {shownTracks?.slice(0, visibleCount).map((track) => (
            <TrackCard
              key={track.id}
              title={track.title}
              subtitle={track.artist}
              icon={mdiMusic}
              image={track.image}
              onClick={() => playTrack(track)}
            />
          ))}
          <div ref={sentinelRef}/>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
