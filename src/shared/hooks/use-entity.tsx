"use client";

import {EntityName, ExtractDomain, HassEntityWithService, useEntity as useHakitEntity} from "@hakit/core";

const noopService = new Proxy({}, {get: () => () => undefined});

function createMissingEntity<E extends EntityName>(entityId: E) {
  const missingEntity = {
    entity_id: entityId,
    state: "unavailable",
    attributes: {},
    context: {id: "", parent_id: null, user_id: null},
    last_changed: "",
    last_updated: "",
    custom: {
      relativeTime: "",
      timeDiff: 0,
      active: false,
      hexColor: "",
      brightness: "",
      brightnessValue: 0,
      rgbaColor: "",
      rgbColor: "",
      color: [0, 0, 0],
    },
    history: {timeline: [], entityHistory: [], coordinates: [], loading: false},
    service: noopService,
  };

  return missingEntity as unknown as HassEntityWithService<ExtractDomain<E>>;
}

export function useEntity<E extends EntityName>(entityId: E): HassEntityWithService<ExtractDomain<E>>;
export function useEntity<E extends EntityName>(entityId: E, options: {returnNullIfNotFound: true}): HassEntityWithService<ExtractDomain<E>> | null;
export function useEntity<E extends EntityName>(entityId: E, options?: {returnNullIfNotFound: true}) {
  const entity = useHakitEntity(entityId, {returnNullIfNotFound: true});
  return entity ?? (options?.returnNullIfNotFound ? null : createMissingEntity(entityId));
}
