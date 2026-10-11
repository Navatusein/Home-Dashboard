"use client"

import {useState} from "react";
import {Grid} from "@/shared/ui-kit";
import {isOffState, useEntity} from "@hakit/core";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {EntityNameBinarySensor, EntityNameButton, EntityNameSensor, EntityNameSwitch} from "@/shared/types/ha-domains";
import PlugIcon from "@public/icons/home-automation-and-buildings/plug.svg";
import PlugOffIcon from "@public/icons/home-automation-and-buildings/plug-off.svg";
import ServerIcon from "@public/icons/devices-and-networks/server.svg";
import ServerOffIcon from "@public/icons/devices-and-networks/server-off.svg";
import PowerIcon from "@public/icons/devices-and-networks/power.svg";
import AccessPointIcon from "@public/icons/devices-and-networks/access-point.svg";

const HOLD_DELAY = 1500;

type Props = {
  title: string;
  colStart: number;
  socketSwitch: EntityNameSwitch;
  statusBinarySensor: EntityNameBinarySensor;
  powerSensor: EntityNameSensor;
  shutdownButton: EntityNameButton;
  wakeButton: EntityNameButton;
}

export default function ServerControls(props: Props) {
  const [isShowPower, setIsShowPower] = useState(false);

  const socketEntity = useEntity(props.socketSwitch);
  const powerEntity = useEntity(props.powerSensor);
  const shutdownEntity = useEntity(props.shutdownButton);
  const wakeEntity = useEntity(props.wakeButton);

  const isSocketOn = !isOffState(socketEntity.state);
  const isRunning = !useEntityOff(props.statusBinarySensor);

  const showPower = () => {
    setIsShowPower(true);

    setTimeout(() => {
      setIsShowPower(false);
    }, 3000);
  }

  return (
    <Grid.Section rowStart={4} colStart={props.colStart} direction="vertical">
      <BaseButton
        title={isShowPower ? `${Math.round(Number(powerEntity.state))} W` : props.title}
        icon={isRunning ? ServerIcon : ServerOffIcon}
        color={isRunning ? "blue" : "default"}
        onClickAction={showPower}
      />
      <BaseButton
        title="Socket"
        icon={isSocketOn ? PlugIcon : PlugOffIcon}
        color={isSocketOn ? "blue" : "default"}
        longPressDelay={HOLD_DELAY}
        onClickAction={isSocketOn ? undefined : () => socketEntity.service.turnOn()}
        onLongPressAction={isSocketOn ? () => socketEntity.service.turnOff() : undefined}
      />
      {isRunning ? (
        <BaseButton
          title="Shutdown"
          icon={PowerIcon}
          longPressDelay={HOLD_DELAY}
          onLongPressAction={() => shutdownEntity.service.press()}
        />
      ) : (
        <BaseButton
          title="Wake"
          icon={AccessPointIcon}
          disabled={!isSocketOn}
          onClickAction={() => wakeEntity.service.press()}
        />
      )}
    </Grid.Section>
  )
}
