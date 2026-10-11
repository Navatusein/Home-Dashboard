"use client"

import {EntityNameSensor} from "@/shared/types/ha-domains";
import {FC, SVGProps} from "react";
import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {isUnavailableState, useEntity} from "@hakit/core";
import {TextTransformer} from "@/shared/text-transformers/base-text-transformer";
import {roundTextTransformer} from "@/shared/text-transformers/number-text-transformer";

type Props = BaseButtonSharedProps & {
  entity: EntityNameSensor;
  icon?: FC<SVGProps<SVGSVGElement>>;
  textTransformer?: TextTransformer;
}

export default function SensorButton(props: Props) {
  const {entity, textTransformer, ...baseProps} = props;
  const entityInstance = useEntity(entity);

  const transformer = textTransformer ?? roundTextTransformer;

  return (
    <BaseButton
      {...baseProps}
      title={
        isUnavailableState(entityInstance.state) ?
        "--" :
        `${transformer(entityInstance.state)} ${entityInstance.attributes.unit_of_measurement ?? ""}`
      }
    />
  )
}
