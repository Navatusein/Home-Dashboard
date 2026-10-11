"use client"

import BatteryIcon from "@public/icons/devices-and-networks/battery.svg";
import Battery2Icon from "@public/icons/devices-and-networks/battery-2.svg";
import Battery3Icon from "@public/icons/devices-and-networks/battery-3.svg";
import Battery4Icon from "@public/icons/devices-and-networks/battery-4.svg";
import Battery5Icon from "@public/icons/devices-and-networks/battery-5.svg";
import BatteryCharging2Icon from "@public/icons/devices-and-networks/battery-charging-2.svg";
import BatteryCharging3Icon from "@public/icons/devices-and-networks/battery-charging-3.svg";
import BatteryCharging4Icon from "@public/icons/devices-and-networks/battery-charging-4.svg";
import BatteryCharging5Icon from "@public/icons/devices-and-networks/battery-charging-5.svg";
import BatteryCharging6Icon from "@public/icons/devices-and-networks/battery-charging-6.svg";
import BatteryOffIcon from "@public/icons/devices-and-networks/battery-off.svg";
import {EntityNameBinarySensor, EntityNameSensor} from "@/shared/types/ha-domains";
import {isOffState, isUnavailableState, useEntity} from "@hakit/core";
import {BaseButton, BaseButtonPosition} from "@/widgets/terminal-buttons/base-button";
import {useState} from "react";

const CHARGE_ICON = {
  default: {
    0: Battery5Icon,
    1: BatteryIcon,
    2: Battery2Icon,
    3: Battery3Icon,
    4: Battery4Icon,
  },
  charging: {
    0: BatteryCharging2Icon,
    1: BatteryCharging3Icon,
    2: BatteryCharging4Icon,
    3: BatteryCharging5Icon,
    4: BatteryCharging6Icon,
  }
}

type Props = BaseButtonPosition & {
  title?: string;
  chargeSensor: EntityNameSensor;
  isChargingBinarySensor?: EntityNameBinarySensor;
  chargingStateSensor?: EntityNameSensor;
  chargingStateValue?: string;
}

export default function ChargedButton(props: Props) {
  const [isShowChargeMode, setIsShowChargeMode] = useState(false);

  const chargePercentEntity = useEntity(props.chargeSensor);
  const isChargePercentEntityUnavailable = isUnavailableState(chargePercentEntity.state);

  const chargingBinaryEntity = useEntity(props.isChargingBinarySensor ?? "unknown", {returnNullIfNotFound: true});
  const chargingStateEntity = useEntity(props.chargingStateSensor ?? "unknown", {returnNullIfNotFound: true});

  const isCharging = props.chargingStateSensor ?
    chargingStateEntity?.state == props.chargingStateValue :
    chargingBinaryEntity != null && !isOffState(chargingBinaryEntity.state);

  const chargePercent = Math.round(parseFloat(chargePercentEntity.state));
  const chargeLevel = Math.min(4, Math.round(chargePercent / 20));

  const switchToChargeMode = () => {
    if (isChargePercentEntityUnavailable || !props.title)
      return;
    
    setIsShowChargeMode(true);
    
    setTimeout(() => {
      setIsShowChargeMode(false);
    }, 3000);
  }
  
  return (
    <BaseButton
      rowSpan={props.rowSpan}
      colSpan={props.colSpan}
      rowStart={props.rowStart}
      colStart={props.colStart}
      icon={
        isChargePercentEntityUnavailable ?
        BatteryOffIcon : 
        CHARGE_ICON[isCharging ? "charging" : "default"][chargeLevel as never]
      }
      title={
        isChargePercentEntityUnavailable ?
        (props.title ?? "--") :
        (isShowChargeMode || !props.title ? `${chargePercent}%` : props.title)
      }
      onClickAction={switchToChargeMode}
    />
  )
}
