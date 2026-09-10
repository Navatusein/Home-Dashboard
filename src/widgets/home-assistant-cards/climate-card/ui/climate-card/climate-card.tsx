import {Button, Card, Flex, RoundedIcon, Select, Space, Typography} from "@/shared/ui-kit";
import {isOffState, useEntity} from "@hakit/core";
import {EntityNameClimate} from "@/shared/types/ha-domains";
import {mdiMinus, mdiPlus, mdiThermostat} from "@mdi/js";
import {CLIMATE_MODES} from "../../types/types";

type Props = {
  climateEntity: EntityNameClimate,
  title: string,
  hiddenModes?: string[],
}

export default function ClimateCard(props: Props) {
  const climateEntity = useEntity(props.climateEntity);
  const isClimateEntityOff = isOffState(climateEntity.state);
  
  const changeTemperature = (value: number) => {
    climateEntity.service.setTemperature({serviceData: {temperature: climateEntity.attributes.temperature + value}});
  }

  const changeMode = (mode: string) => {
    climateEntity.service.setHvacMode({serviceData: {hvac_mode: mode}});
  }

  const currentMode = CLIMATE_MODES[climateEntity.state];

  const modeItems = (climateEntity.attributes.hvac_modes as string[])
    .filter((mode) => mode in CLIMATE_MODES && !props.hiddenModes?.includes(mode))
    .map((mode) => ({
      key: mode,
      value: mode,
      label: CLIMATE_MODES[mode].title,
      icon: CLIMATE_MODES[mode].icon
    }));

  return (
    <Card stackCount={1} padding="xs" clickable color={currentMode?.color}>
      <Flex align="start" justify="space-between" style={{height: "100%"}}>
        <Flex gap="xs" align="center" style={{height: "100%"}}>
          <RoundedIcon path={mdiThermostat}/>
          <Flex vertical>
            <Typography.Text>
              {props.title}
            </Typography.Text>
            <Typography.Text textColor="secondary" fontSize="sm">
              {`${currentMode?.title} ${climateEntity.attributes.current_temperature}°C`}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex gap="xs" align="center" style={{height: "100%"}}>
          {!isClimateEntityOff && (
            <Space compact>
              <Button
                shape="round"
                icon={mdiPlus}
                onClick={() => changeTemperature(1)}
              />
              <Button fontSize="sm">
                {`${climateEntity.attributes.temperature}°C`}
              </Button>
              <Button
                shape="round"
                icon={mdiMinus}
                onClick={() => changeTemperature(-1)}
              />
            </Space>
          )}
          <Select
            items={modeItems}
            value={climateEntity.state}
            onValueChange={changeMode}
            placeholderIcon={currentMode?.icon}
            shape="round"
            compact
            iconOnly
          />
        </Flex>
      </Flex>
    </Card>
  )
}
