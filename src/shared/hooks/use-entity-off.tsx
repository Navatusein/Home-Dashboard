"use client";

import {isOffState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";

export function useEntityOff(entityId: Parameters<typeof useEntity>[0]) {
  const entity = useEntity(entityId);
  return isOffState(entity.state);
}