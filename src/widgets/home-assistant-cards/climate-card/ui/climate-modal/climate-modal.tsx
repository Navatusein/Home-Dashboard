"use client"

import {useState} from "react";
import {ControlSliderCircular} from "@hakit/components";
import {isOffState, isUnavailableState, useEntity} from "@hakit/core";
import {Button, Flex, Grid, ModalPopUp, Select, Typography} from "@/shared/ui-kit";
import {EntityNameClimate} from "@/shared/types/ha-domains";
import {mdiArrowLeftRight, mdiArrowUpDown, mdiFan, mdiMinus, mdiPlus, mdiThermostat} from "@mdi/js";
import styles from "./climate-modal.module.scss";
import {CLIMATE_MODES} from "../../types/types";
import {formatMode} from "../../helpers/format-mode";

type Props = {
  climateEntity: EntityNameClimate,
  title: string,
  hiddenModes?: string[],
  isOpen: boolean,
  close: () => void,
}

export default function ClimateModal(props: Props) {
  const climateEntity = useEntity(props.climateEntity);
  const isOff = isOffState(climateEntity.state);
  const isUnavailable = isUnavailableState(climateEntity.state);

  const [dragTemperature, setDragTemperature] = useState<number | null>(null);

  const min: number = climateEntity.attributes.min_temp;
  const max: number = climateEntity.attributes.max_temp;
  const step: number = climateEntity.attributes.target_temp_step ?? 1;
  const temperature: number = dragTemperature ?? climateEntity.attributes.temperature;

  const currentMode = CLIMATE_MODES[climateEntity.state];

  const setTemperature = (value: number) => {
    setDragTemperature(null);
    climateEntity.service.setTemperature({serviceData: {temperature: Math.min(max, Math.max(min, value))}});
  }

  const toItems = (icon: string, modes?: string[]) => (modes ?? []).map((mode) => ({
    key: mode,
    value: mode,
    label: formatMode(mode),
    icon: icon,
  }));

  const hvacModeItems = (climateEntity.attributes.hvac_modes as string[])
    .filter((mode) => mode in CLIMATE_MODES && !props.hiddenModes?.includes(mode))
    .map((mode) => ({
      key: mode,
      value: mode,
      label: CLIMATE_MODES[mode].title,
      icon: CLIMATE_MODES[mode].icon
    }));

  const modeSelects = [
    {
      label: "Mode",
      value: climateEntity.state,
      items: hvacModeItems,
      onChange: (mode: string) => climateEntity.service.setHvacMode({serviceData: {hvac_mode: mode}}),
    },
    {
      label: "Fan mode",
      value: climateEntity.attributes.fan_mode,
      items: toItems(mdiFan, climateEntity.attributes.fan_modes),
      onChange: (mode: string) => climateEntity.service.setFanMode({serviceData: {fan_mode: mode}}),
    },
    {
      label: "Swing mode",
      value: climateEntity.attributes.swing_mode,
      items: toItems(mdiArrowUpDown, climateEntity.attributes.swing_modes),
      onChange: (mode: string) => climateEntity.service.setSwingMode({serviceData: {swing_mode: mode}}),
    },
    {
      label: "Horizontal swing",
      value: climateEntity.attributes.swing_horizontal_mode,
      items: toItems(mdiArrowLeftRight, climateEntity.attributes.swing_horizontal_modes),
      onChange: (mode: string) => climateEntity.service.setSwingHorizontalMode({serviceData: {swing_horizontal_mode: mode}}),
    },
  ].filter((select) => select.items.length > 0);

  return (
    <ModalPopUp placement="center" isOpen={props.isOpen} close={props.close}>
      <ModalPopUp.Header title={props.title} icon={mdiThermostat}/>
      <ModalPopUp.Content>
        <Flex vertical align="center" gap="sm">
          <Flex vertical align="center">
            <Typography.Text textColor="secondary" fontSize="sm">
              Current temperature
            </Typography.Text>
            <Typography.Text bold fontSize="lg">
              {`${climateEntity.attributes.current_temperature} °C`}
            </Typography.Text>
          </Flex>
          <div className={styles["slider"]}>
            <ControlSliderCircular
              style={{
                width: "100%",
                ["--ha-control-slider-track-bg" as never]: "var(--color-primary)",
                ["--ha-control-slider-track-bg-opacity" as never]: 1,
                ["--ha-control-slider-clear" as never]: "var(--color-background)",
                ["--ha-500-contrast" as never]: "var(--color-text-primary)",
              }}
              colors={{color: currentMode?.color && `var(--color-${currentMode.color})`}}
              mode={climateEntity.state == "heat" ? "start" : climateEntity.state == "cool" ? "end" : "full"}
              value={temperature}
              current={climateEntity.attributes.current_temperature}
              min={min}
              max={max}
              step={step}
              inactive={isOff}
              disabled={isUnavailable}
              onChange={setDragTemperature}
              onChangeApplied={setTemperature}
            />
            <div className={styles["slider-value"]}>
              <Typography.Text textColor="secondary" fontSize="lg">
                {currentMode?.title ?? formatMode(climateEntity.state)}
              </Typography.Text>
              <Typography.Text fontSize="default" className={styles["target"]}>
                {`${temperature}°`}
              </Typography.Text>
            </div>
            <Flex gap="sm" className={styles["controls"]}>
              <Button
                shape="round"
                icon={mdiMinus}
                disabled={isUnavailable}
                onClick={() => setTemperature(temperature - step)}
              />
              <Button
                shape="round"
                icon={mdiPlus}
                disabled={isUnavailable}
                onClick={() => setTemperature(temperature + step)}
              />
            </Flex>
          </div>
          <Grid columns={2} gap="xs" className={styles["modes"]}>
            {modeSelects.map((select) => (
              <Flex vertical gap="xxs" key={select.label}>
                <Typography.Text textColor="secondary" fontSize="sm">
                  {select.label}
                </Typography.Text>
                <Select
                  items={select.items}
                  value={select.value}
                  onValueChange={select.onChange}
                  disabled={isUnavailable}
                  shape="round"
                />
              </Flex>
            ))}
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </ModalPopUp>
  )
}
