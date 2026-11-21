"use client"

import {BootstrapGrid, Flex, ResponsiveToggler} from "@/shared/ui-kit";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import {useIsNative} from "@/shared/hooks/use-is-native";
import PlayersSegment from "../../segments/players-segment/players-segment";
import PlayerSegment from "../../segments/player-segment/player-segment";
import PhonePlayerSegment from "../../segments/phone-player-segment/phone-player-segment";
import LibrarySegment from "../../segments/library-segment/library-segment";
import QueueModal from "../../modals/queue-modal/queue-modal";
import TransferModal from "../../modals/transfer-modal/transfer-modal";
import GroupModal from "../../modals/group-modal/group-modal";
import CollectionModal from "../../modals/collection-modal/collection-modal";
import PlayerSettingsModal from "../../modals/player-settings-modal/player-settings-modal";
import {useMusicPlayers} from "../../hooks/use-music-players";
import {NOW_PLAYING_ID, PHONE_PLAYER} from "../../constants/music-assistant";
import {MusicPlayerId} from "../../types/types";

type Props = {
  musicAssistantUrl?: string,
}

export default function MusicView(props: Props) {
  const players = useMusicPlayers();
  const isNative = useIsNative();
  const [storedPlayer, setPlayer] = useLocalStorage<MusicPlayerId | null>("music-player", null);

  const isPhoneSelected = isNative && storedPlayer == PHONE_PLAYER;
  const entityPlayer = players.find((player) => player == storedPlayer) ?? players.at(0);
  const player = isPhoneSelected ? PHONE_PLAYER : entityPlayer;

  const selectPlayer = (selected: MusicPlayerId) => {
    setPlayer(selected);
    document.getElementById(NOW_PLAYING_ID)?.scrollIntoView({behavior: "smooth", block: "start"});
  }

  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <Flex vertical gap="sm">
            <ResponsiveToggler breakpoint="sm" hide>
              <InfoCard/>
            </ResponsiveToggler>
            {player && (
              <PlayersSegment players={players} player={player} showPhone={isNative} onPlayerChange={selectPlayer}/>
            )}
          </Flex>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          {isPhoneSelected ? (
            <PhonePlayerSegment/>
          ) : entityPlayer && (
            <PlayerSegment player={entityPlayer}/>
          )}
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} md={24}>
          <LibrarySegment musicAssistantUrl={props.musicAssistantUrl}/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      {player && (
        <CollectionModal player={player}/>
      )}
      {!isPhoneSelected && entityPlayer && (
        <>
          <QueueModal player={entityPlayer}/>
          <TransferModal player={entityPlayer} onPlayerChange={setPlayer}/>
          <GroupModal player={entityPlayer}/>
        </>
      )}
      <PlayerSettingsModal/>
    </Flex>
  )
}
