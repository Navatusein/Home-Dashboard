"use client"

import {isOffState, useEntity} from "@hakit/core";
import {EntityNameBinarySensor, EntityNameSwitch} from "@/shared/types/ha-domains";
import {FC, SVGProps} from "react";
import {BaseButton, BaseButtonColors, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";

type Props = BaseButtonSharedProps & {
  title?: string;
  switchEntity: EntityNameSwitch;
  isMeetingBinarySensor: EntityNameBinarySensor;
  isApplicationActiveBinarySensor: EntityNameBinarySensor;
  iconOn: FC<SVGProps<SVGSVGElement>>;
  iconOff: FC<SVGProps<SVGSVGElement>>;
  colorOn: BaseButtonColors;
  colorOff?: BaseButtonColors;
}

export default function CommunicationButton(props: Props) {
  const {
    switchEntity: switchEntityName,
    isMeetingBinarySensor: isMeetingBinarySensorName,
    isApplicationActiveBinarySensor: isApplicationActiveBinarySensorName,
    iconOn, iconOff, colorOn, colorOff,
    ...baseProps
  } = props;

  const switchEntity = useEntity(switchEntityName);
  const isMeetingBinarySensor = useEntity(isMeetingBinarySensorName);
  const isApplicationActiveBinarySensor = useEntity(isApplicationActiveBinarySensorName);

  const switchEntityIsOff = isOffState(switchEntity.state);
  const isMeetingIsOff = isOffState(isMeetingBinarySensor.state);
  const isApplicationActiveIsOff = isOffState(isApplicationActiveBinarySensor.state);

  return (
    <BaseButton
      {...baseProps}
      disabled={isApplicationActiveIsOff}
      icon={switchEntityIsOff ? iconOff : iconOn}
      color={isMeetingIsOff ? colorOff : colorOn}
      onClickAction={() => switchEntity.service.toggle()}
    />
  )
}