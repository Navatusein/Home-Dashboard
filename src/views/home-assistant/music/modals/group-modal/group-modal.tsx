import {Grid, ModalPopUp} from "@/shared/ui-kit";
import {isUnavailableState, useHass} from "@hakit/core";
import {mdiSpeaker, mdiSpeakerMultiple} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {GroupMemberCard} from "@/widgets/home-assistant-cards/group-member-card";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {useMusicPlayers} from "../../hooks/use-music-players";

type Props = {
  player: EntityNameMediaPlayer,
}

export default function GroupModal(props: Props) {
  const callService = useHass((state) => state.helpers.callService);
  const entity = useEntity(props.player);
  const players = useMusicPlayers();

  const members: string[] = entity.attributes.group_members ?? [];

  const toggle = (member: EntityNameMediaPlayer, checked: boolean) => {
    if (checked)
      entity.service.join({serviceData: {group_members: [member]}});
    else
      callService({domain: "mediaPlayer", service: "unjoin", target: member});
  }

  return (
    <QueryModalControl modal="group">
      <ModalPopUp.Header title="Group Players" icon={mdiSpeakerMultiple}/>
      <ModalPopUp.Content>
        <Grid columns={1} gap="xs">
          {players.filter((player) => player != props.player).map((player) => (
            <GroupMemberCard
              key={player}
              icon={mdiSpeaker}
              entity={player}
              checked={members.includes(player)}
              disabled={isUnavailableState(entity.state)}
              onChange={(checked) => toggle(player, checked)}
            />
          ))}
        </Grid>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
