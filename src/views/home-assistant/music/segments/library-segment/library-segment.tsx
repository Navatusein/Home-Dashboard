import {useEffect, useRef, useState} from "react";
import {Flex, Grid, Input, SegmentHeader, Segmented, Select, Typography} from "@/shared/ui-kit";
import {InternalStore, useHass} from "@hakit/core";
import {mdiBookshelf, mdiMagnify} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import {MediaItemCard} from "@/widgets/home-assistant-cards/media-item-card";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {observeLayout} from "@/shared/helpers/observe-layout";
import {useInfiniteScroll} from "@/shared/hooks/use-infinite-scroll";
import {useDebounce} from "@/shared/hooks/use-debounce";
import {ALBUM_SORTS, LIBRARY_SORTS, MEDIA_TYPE_ICONS, MUSIC_ASSISTANT_CONFIG_ENTRY} from "../../constants/music-assistant";
import {LibraryItem, LibraryMediaType} from "../../types/types";
import {musicAssistantImage} from "../../helpers/music-assistant-image";
import styles from "./library-segment.module.scss";

const MEDIA_TYPES = [
  {value: "playlist" as const, text: "Playlists"},
  {value: "album" as const, text: "Albums"},
  {value: "artist" as const, text: "Artists"},
];

const PAGE_SIZE = 60;
const SEARCH_DELAY = 300;

type LibraryQuery = {
  mediaType: LibraryMediaType,
  search: string,
  orderBy: string,
}

type CallService = InternalStore["helpers"]["callService"];

function fetchLibrary(callService: CallService, query: LibraryQuery, offset: number) {
  return callService<{items: LibraryItem[]}, "musicAssistant", "getLibrary">({
    domain: "musicAssistant",
    service: "getLibrary",
    serviceData: {
      config_entry_id: MUSIC_ASSISTANT_CONFIG_ENTRY,
      media_type: query.mediaType,
      order_by: query.orderBy,
      limit: PAGE_SIZE,
      offset: offset,
      ...(query.search && {search: query.search}),
    },
    returnResponse: true,
  }).then((result) => result.response.items);
}

type Props = {
  musicAssistantUrl?: string,
}

export default function LibrarySegment(props: Props) {
  const callService = useHass((state) => state.helpers.callService);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useBreakpoint("sm");
  const isTablet = useBreakpoint("md");

  const gridRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const [mediaType, setMediaType] = useState<LibraryMediaType>("playlist");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("sort_name");
  const [library, setLibrary] = useState<{key: string, query: LibraryQuery, items: LibraryItem[], hasMore: boolean}>();
  const [gridTop, setGridTop] = useState(0);

  const debouncedSearch = useDebounce(search.trim(), SEARCH_DELAY);
  const sorts = mediaType == "album" ? ALBUM_SORTS : LIBRARY_SORTS;
  const sort = sorts.some((option) => option.value == orderBy) ? orderBy : "sort_name";

  const key = `${mediaType}|${sort}|${debouncedSearch}`;
  const current = library?.key == key ? library : undefined;
  const items = current?.items;

  useEffect(() => observeLayout(gridRef.current!, () => {
    setGridTop(gridRef.current!.getBoundingClientRect().top + window.scrollY);
  }), []);

  useEffect(() => {
    const query = {mediaType: mediaType, search: debouncedSearch, orderBy: sort};

    fetchLibrary(callService, query, 0)
      .then((page) => setLibrary({key: key, query: query, items: page, hasMore: page.length == PAGE_SIZE}))
      .catch(console.error);
  }, [callService, key, mediaType, debouncedSearch, sort]);

  const loadMore = () => {
    if (!current || loadingRef.current)
      return;

    loadingRef.current = true;

    fetchLibrary(callService, current.query, current.items.length)
      .then((page) => setLibrary({...current, items: [...current.items, ...page], hasMore: page.length == PAGE_SIZE}))
      .catch(console.error)
      .finally(() => loadingRef.current = false);
  }

  const sentinelRef = useInfiniteScroll(loadMore, current?.hasMore ?? false);

  const open = (item: LibraryItem) => {
    const params = new URLSearchParams({modal: "collection", uri: item.uri, name: item.name || item.version});
    router.push(`${pathname}?${params}`);
  }

  return (
    <Flex vertical gap="xs">
      <SegmentHeader icon={mdiBookshelf} title="Library"/>
      <Segmented options={MEDIA_TYPES} value={mediaType} onChange={setMediaType} color="purple"/>
      <Flex gap="xs">
        <Input
          icon={mdiMagnify}
          placeholder="Search"
          className={styles["search"]}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onClear={() => setSearch("")}
        />
        <Select items={sorts} value={sort} onValueChange={setOrderBy}/>
      </Flex>
      {items?.length == 0 && (
        <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
          Nothing here yet
        </Typography.Text>
      )}
      <Grid
        ref={gridRef}
        columns={isMobile ? 3 : (isTablet ? 6 : 3)}
        gap="xs"
        className={isTablet ? undefined : styles["scroll"]}
        style={{["--library-grid-top" as never]: `${gridTop}px`}}
      >
        {items?.map((item, index) => (
          <MediaItemCard
            key={`${index}-${item.uri}`}
            title={item.name || item.version}
            icon={MEDIA_TYPE_ICONS[item.media_type]}
            image={musicAssistantImage(item.image, props.musicAssistantUrl)}
            onClick={() => open(item)}
          />
        ))}
        <div ref={sentinelRef} style={{gridColumn: "1 / -1"}}/>
      </Grid>
    </Flex>
  )
}
