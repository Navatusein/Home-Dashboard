import {
  BaseButton,
  BaseButtonSharedProps,
  BaseButtonStatefulVisualProps,
  resolveStatefulVisuals,
} from "@/widgets/terminal-buttons/base-button";
import {EntityNameSelect} from "@/shared/types/ha-domains";
import {useEntity} from "@hakit/core";

type Props = BaseButtonSharedProps & BaseButtonStatefulVisualProps & {
  title?: string;
  entity: EntityNameSelect;
  state: string;
}

export default function SelectButton(props: Props) {
  const {
    entity, state,
    icon, iconEnabled, iconDisabled,
    color, colorEnabled, colorDisabled,
    image, imageEnabled, imageDisabled,
    ...baseProps
  } = props;

  const entityInstance = useEntity(entity);

  const visuals = resolveStatefulVisuals(entityInstance.state == state, {
    icon, iconEnabled, iconDisabled,
    color, colorEnabled, colorDisabled,
    image, imageEnabled, imageDisabled,
  });

  return (
    <BaseButton
      {...baseProps}
      {...visuals}
      onClickAction={() => entityInstance.service.selectOption({serviceData: {option: state}})}
    />
  )
}