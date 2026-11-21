import {useState} from "react";
import {Button, Flex, Input, ModalPopUp, Select, Typography} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import {mdiCheck, mdiDownload, mdiMagnify, mdiMusic, mdiPlay} from "@mdi/js";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {TrackCard} from "@/widgets/home-assistant-cards/track-card";
import {MEDIA_TYPE_ICONS, PHONE_PLAYER, TRACK_SORTS} from "../../constants/music-assistant";
import {LibraryMediaType, MusicPlayerId, MusicTrack} from "../../types/types";
import {useCollectionTracks} from "../../hooks/use-collection-tracks";
import {useInfiniteScroll} from "@/shared/hooks/use-infinite-scroll";
import {Dashboard} from "@/shared/native/dashboard-plugin";
import {useIsNative} from "@/shared/hooks/use-is-native";
import {useDownloads} from "@/shared/hooks/use-downloads";
import {filterTracks} from "../../helpers/filter-tracks";

const PAGE_SIZE = 50;

type Props = {
  player: MusicPlayerId,
}

export default function CollectionModal(props: Props) {
  const callService = useHass((state) => state.helpers.callService);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("modal") == "collection";
  const uri = isOpen ? searchParams.get("uri") : null;
  const mediaType = (/^[^:]+:\/\/(\w+)\//.exec(uri ?? "")?.[1] ?? "playlist") as LibraryMediaType;

  const tracks = useCollectionTracks(uri);
  const isNative = useIsNative();
  const downloads = useDownloads();
  const download = downloads?.find((collection) => collection.id == uri);
  const downloadedCount = download?.tracks.filter((track) => track.downloaded).length ?? 0;

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

  const playable = (tracks ?? []).filter((track) => track.navidromeId);
  const nativeTracks = playable.map((track) => ({id: track.navidromeId!, title: track.title, artist: track.artist, image: track.image}));

  const playOnPhone = (start?: MusicTrack) => {
    const startIndex = start ? playable.findIndex((track) => track.id == start.id) : 0;

    Dashboard.play({tracks: nativeTracks, startIndex: Math.max(0, startIndex)}).catch(console.error);

    router.push(pathname);
  }

  const playAll = () => {
    if (props.player == PHONE_PLAYER)
      playOnPhone();
    else
      play(uri!, mediaType);
  }

  const playTrack = (track: MusicTrack) => {
    if (props.player == PHONE_PLAYER)
      playOnPhone(track);
    else if (mediaType == "artist")
      play(track.uri, "track");
    else
      play(uri!, mediaType, track.uri);
  }

  return (
    <QueryModalControl modal="collection">
      <ModalPopUp.Header title={searchParams.get("name") ?? "Library"} icon={MEDIA_TYPE_ICONS[mediaType]}>
        <Flex vertical gap="xs">
          <Flex justify="center" gap="xs">
            <Button color="purple" icon={mdiPlay} disabled={!uri} onClick={playAll}>
              Play All
            </Button>
            {isNative && (
              <Button
                icon={download && downloadedCount == download.tracks.length ? mdiCheck : mdiDownload}
                disabled={!nativeTracks.length}
                onClick={() => Dashboard.download({id: uri!, name: searchParams.get("name") ?? "Library", tracks: nativeTracks}).catch(console.error)}
              >
                {download ? (downloadedCount == download.tracks.length ? "Downloaded" : `${downloadedCount} / ${download.tracks.length}`) : "Download"}
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
