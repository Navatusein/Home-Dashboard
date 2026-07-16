"use client";

import {isOffState, useEntity} from "@hakit/core";

export function useEntityOff(entityId: Parameters<typeof useEntity>[0]) {
  const entity = useEntity(entityId);
  return isOffState(entity.state);
}