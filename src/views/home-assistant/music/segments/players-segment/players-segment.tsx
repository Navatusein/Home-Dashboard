import {mdiSpeaker} from "@mdi/js";
import {StatusCard} from "@/widgets/home-assistant-cards/status-card";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import styles from "./players-segment.module.scss";

type Props = {
  players: EntityNameMediaPlayer[],
  player: EntityNameMediaPlayer,
  onPlayerChange: (player: EntityNameMediaPlayer) => void,
}

export default function PlayersSegment(props: Props) {
  return (
    <div className={styles["players"]}>
      {props.players.map((player) => (
        <StatusCard
          key={player}
          icon={mdiSpeaker}
          iconColor={player == props.player ? "purple" : "secondary"}
          entity={player}
          textTransformer={pascalCaseTextTransformer}
          onClick={() => props.onPlayerChange(player)}
        />
      ))}
    </div>
  )
}
