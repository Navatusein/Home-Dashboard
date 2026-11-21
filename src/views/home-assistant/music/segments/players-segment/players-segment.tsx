import {mdiSpeaker} from "@mdi/js";
import {StatusCard} from "@/widgets/home-assistant-cards/status-card";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";
import {PhoneStatusCard} from "@/widgets/home-assistant-cards/phone-status-card";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {MusicPlayerId} from "../../types/types";
import {PHONE_PLAYER} from "../../constants/music-assistant";
import styles from "./players-segment.module.scss";

type Props = {
  players: EntityNameMediaPlayer[],
  player: MusicPlayerId,
  showPhone?: boolean,
  onPlayerChange: (player: MusicPlayerId) => void,
}

export default function PlayersSegment(props: Props) {
  return (
    <div className={styles["players"]}>
      {props.showPhone && (
        <PhoneStatusCard
          selected={props.player == PHONE_PLAYER}
          onClick={() => props.onPlayerChange(PHONE_PLAYER)}
        />
      )}
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
