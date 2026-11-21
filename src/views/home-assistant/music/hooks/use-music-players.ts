import {useHass} from "@hakit/core";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";

export function useMusicPlayers() {
  const registry = useHass((state) => state.entitiesRegistryDisplay);

  return Object.values(registry)
    .filter((entry) => entry.platform == "music_assistant" && entry.entity_id.startsWith("media_player.") && !entry.hidden)
    .map((entry) => entry.entity_id as EntityNameMediaPlayer)
    .sort();
}
