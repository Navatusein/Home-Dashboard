import {EntityNameButton} from "@/shared/types/ha-domains";
import {FC, SVGProps} from "react";
import {BaseButton, BaseButtonColors, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {useEntity} from "@hakit/core";

type Props = BaseButtonSharedProps & {
  entity: EntityNameButton;
  title?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  color?: BaseButtonColors;
  image?: string;
}

export default function ButtonButton(props: Props) {
  const {entity, ...baseProps} = props;
  const entityInstance = useEntity(entity);

  return (
    <BaseButton
      {...baseProps}
      onClickAction={() => entityInstance.service.press()}
    />
  )
}