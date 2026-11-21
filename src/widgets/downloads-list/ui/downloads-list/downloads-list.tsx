import {Button, Flex, Typography} from "@/shared/ui-kit";
import {mdiDeleteOutline, mdiPlaylistMusic} from "@mdi/js";
import {TrackCard} from "@/widgets/home-assistant-cards/track-card";
import {useDownloads} from "@/shared/hooks/use-downloads";
import {Dashboard, DownloadedCollection} from "@/shared/native/dashboard-plugin";
import {nativeImage} from "@/shared/native/native-image";

type Props = {
  onPlay?: () => void,
}

export default function DownloadsList(props: Props) {
  const collections = useDownloads();

  const play = (collection: DownloadedCollection) => {
    const tracks = collection.tracks.filter((track) => track.downloaded);

    if (!tracks.length)
      return;

    Dashboard.play({
      tracks: tracks.map((track) => ({id: track.id, title: track.title, artist: track.artist, image: track.image})),
      startIndex: 0,
    }).catch(console.error);

    props.onPlay?.();
  }

  if (collections && !collections.length) {
    return (
      <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
        Nothing downloaded yet
      </Typography.Text>
    )
  }

  return (
    <Flex vertical gap="xs">
      {collections?.map((collection) => {
        const downloaded = collection.tracks.filter((track) => track.downloaded).length;

        return (
          <TrackCard
            key={collection.id}
            title={collection.name}
            subtitle={downloaded == collection.tracks.length ? `${downloaded} ${downloaded == 1 ? "track" : "tracks"}` : `${downloaded} / ${collection.tracks.length} downloaded`}
            icon={mdiPlaylistMusic}
            image={nativeImage(collection.tracks.find((track) => track.cover)?.cover)}
            onClick={() => play(collection)}
            action={
              <Button
                outline
                shape="round"
                icon={mdiDeleteOutline}
                aria-label="Remove download"
                onClick={(event) => {
                  event.stopPropagation();
                  Dashboard.removeDownload({id: collection.id}).catch(console.error);
                }}
              />
            }
          />
        )
      })}
    </Flex>
  )
}
