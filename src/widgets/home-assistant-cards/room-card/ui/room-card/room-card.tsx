import {Card, Flex, Icon, RoundedIcon, Typography} from "@/shared/ui-kit";
import {mdiLightbulb, mdiThermostat} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import ClimateAction from "../climate-action/climate-action";
import {useState} from "react";
import styles from "./room-card.module.scss";
import {EntityNameClimate, EntityNameLight, EntityNameSensor} from "@/shared/types/ha-domains";
import {isOffState, useEntity} from "@hakit/core";
import {roundTextTransformer} from "@/shared/text-transformers/number-text-transformer";
import useGestures, {stopGestures} from "@/shared/hooks/use-gestures";

type Props = {
  roomName: string;
  roomIcon: string;
  roomModalPath: string;
  lightEntity: EntityNameLight;
  temperatureEntity: EntityNameSensor;
  climateEntity?: EntityNameClimate;
}

enum Mods {
  "light",
  "climate"
}

const MODS_ICONS = {
  0: mdiLightbulb,
  1: mdiThermostat,
}

export default function RoomCard(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const lightEntity = useEntity(props.lightEntity);
  const temperatureEntity = useEntity(props.temperatureEntity);

  const [mode, setMode] = useState<Mods>(Mods.light);

  const isLightOn = !isOffState(lightEntity.state);

  const navigateToRoomModal = () => {
    router.push(`${pathname}?modal=${props.roomModalPath}`);
  }

  const switchMode = () => {
    setMode((currentState) => {
      if (currentState === Mods.climate)
        return Mods.light;

      return currentState + 1;
    })
  }

  const gestureBind = useGestures<HTMLDivElement>({
    onClickAction: () => navigateToRoomModal(),
    onLongPressAction: () => lightEntity.service.toggle(),
    moveThreshold: 20
  });

  return (
    <Card
      clickable
      padding="sm"
      color={isLightOn ? "yellow" : "default"}
      {...gestureBind}
    >
      <Flex>
        <Flex vertical justify="space-between" className={styles["container"]}>
          <Flex gap="xxs">
            <RoundedIcon path={MODS_ICONS[mode]} clickable onClick={switchMode} {...stopGestures}/>
          </Flex>
          <Flex vertical gap="xxs">
            <Flex align="center" gap="xs">
              <Icon path={props.roomIcon}/>
              <Typography.Text>
                {roundTextTransformer(temperatureEntity.state)}{temperatureEntity.attributes.unit_of_measurement}
              </Typography.Text>
            </Flex>
            <Typography.Text textColor="secondary" fontSize="sm">
              {props.roomName}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex vertical className={styles["action-container"]}>
          {mode === Mods.climate && (
            <ClimateAction climateEntity={props.climateEntity ?? "climate."}/>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
