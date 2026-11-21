"use client"

import {BootstrapGrid, Flex, ResponsiveToggler} from "@/shared/ui-kit";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import PlayersSegment from "../../segments/players-segment/players-segment";
import PlayerSegment from "../../segments/player-segment/player-segment";
import LibrarySegment from "../../segments/library-segment/library-segment";
import QueueModal from "../../modals/queue-modal/queue-modal";
import TransferModal from "../../modals/transfer-modal/transfer-modal";
import GroupModal from "../../modals/group-modal/group-modal";
import CollectionModal from "../../modals/collection-modal/collection-modal";
import PlayerSettingsModal from "../../modals/player-settings-modal/player-settings-modal";
import {useMusicPlayers} from "../../hooks/use-music-players";

type Props = {
  musicAssistantUrl?: string,
}

export default function MusicView(props: Props) {
  const players = useMusicPlayers();
  const [storedPlayer, setPlayer] = useLocalStorage<EntityNameMediaPlayer | null>("music-player", null);

  const player = storedPlayer && players.includes(storedPlayer) ? storedPlayer : players.at(0);

  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <Flex vertical gap="sm">
            <ResponsiveToggler breakpoint="sm" hide>
              <InfoCard/>
            </ResponsiveToggler>
            {player && (
              <PlayersSegment players={players} player={player} onPlayerChange={setPlayer}/>
            )}
          </Flex>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          {player && (
            <PlayerSegment player={player}/>
          )}
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} md={24}>
          <LibrarySegment musicAssistantUrl={props.musicAssistantUrl}/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      {player && (
        <>
          <QueueModal player={player}/>
          <TransferModal player={player} onPlayerChange={setPlayer}/>
          <GroupModal player={player}/>
          <CollectionModal player={player}/>
        </>
      )}
      <PlayerSettingsModal/>
    </Flex>
  )
}
