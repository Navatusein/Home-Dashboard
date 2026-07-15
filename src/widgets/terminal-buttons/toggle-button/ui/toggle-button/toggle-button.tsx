"use client"

import {
  BaseButton,
  BaseButtonSharedProps,
  BaseButtonStatefulVisualProps,
  resolveStatefulVisuals,
} from "@/widgets/terminal-buttons/base-button";
import {HassEntityWithService, isOffState, useEntity} from "@hakit/core";
import {EntityNameLight, EntityNameSwitch} from "@/shared/types/ha-domains";

type Props = BaseButtonSharedProps & BaseButtonStatefulVisualProps & {
  title?: string;
  entity: EntityNameLight | EntityNameSwitch;
}

export function ToggleButton(props: Props) {
  const {
    entity,
    icon, iconEnabled, iconDisabled,
    color, colorEnabled, colorDisabled,
    image, imageEnabled, imageDisabled,
    ...baseProps
  } = props;

  const entityInstance = useEntity(entity);

  const visuals = resolveStatefulVisuals(!isOffState(entityInstance.state), {
    icon, iconEnabled, iconDisabled,
    color, colorEnabled, colorDisabled,
    image, imageEnabled, imageDisabled,
  });

  return (
    <BaseButton
      {...baseProps}
      {...visuals}
      onClickAction={() => (entityInstance as HassEntityWithService<"switch">).service.toggle()}
    />
  )
}