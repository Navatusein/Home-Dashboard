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
import {isUnavailableState, useEntity} from "@hakit/core";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
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

type Props = {
  title?: string;
  chargeSensor: EntityNameSensor;
  isChargingBinarySensor: EntityNameBinarySensor;
}

export default function ChargedButton(props: Props) {
  const [isShowChargeMode, setIsShowChargeMode] = useState(false);
  
  const chargePercentEntity = useEntity(props.chargeSensor);
  const isChargePercentEntityUnavailable = isUnavailableState(chargePercentEntity.state);
  
  const isCharging = !useEntityOff(props.isChargingBinarySensor);
  
  const chargePercent = Math.round((parseInt(chargePercentEntity?.state) ?? 0) / 20);
  
  const switchToChargeMode = () => {
    if (isChargePercentEntityUnavailable)
      return;
    
    setIsShowChargeMode(true);
    
    setTimeout(() => {
      setIsShowChargeMode(false);
    }, 3000);
  }
  
  return (
    <BaseButton
      icon={
        isChargePercentEntityUnavailable ? 
        BatteryOffIcon : 
        CHARGE_ICON[isCharging ? "charging" : "default"][chargePercent as never]
      }
      title={isShowChargeMode ? `${chargePercentEntity?.state ?? 0}%` : props.title}
      onClickAction={switchToChargeMode}
    />
  )
}
