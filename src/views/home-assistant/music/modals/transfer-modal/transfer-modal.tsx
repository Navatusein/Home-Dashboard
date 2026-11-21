import {Grid, ModalPopUp} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import {mdiCastAudio, mdiSpeaker} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {PlayerCard} from "@/widgets/home-assistant-cards/player-card";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {useMusicPlayers} from "../../hooks/use-music-players";

type Props = {
  player: EntityNameMediaPlayer,
  onPlayerChange: (player: EntityNameMediaPlayer) => void,
}

export default function TransferModal(props: Props) {
  const callService = useHass((state) => state.helpers.callService);
  const router = useRouter();
  const pathname = usePathname();
  const players = useMusicPlayers();

  const transfer = (target: EntityNameMediaPlayer) => {
    callService({
      domain: "musicAssistant",
      service: "transferQueue",
      target: target,
      serviceData: {source_player: props.player, auto_play: true},
    });

    props.onPlayerChange(target);
    router.push(pathname);
  }

  return (
    <QueryModalControl modal="transfer">
      <ModalPopUp.Header title="Transfer Queue" icon={mdiCastAudio}/>
      <ModalPopUp.Content>
        <Grid columns={1} gap="xs">
          {players.filter((player) => player != props.player).map((player) => (
            <PlayerCard
              key={player}
              icon={mdiSpeaker}
              entity={player}
              onClick={() => transfer(player)}
            />
          ))}
        </Grid>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
