import {useState} from "react";
import {Card, Flex, RoundedIcon, Slider, Typography} from "@/shared/ui-kit";
import {isOffState, isUnavailableState, useEntity} from "@hakit/core";
import {mdiLightbulb} from "@mdi/js";
import {EntityNameLight} from "@/shared/types/ha-domains";

type Props = {
  title: string,
  entity: EntityNameLight,
  icon?: string,
  brightness?: boolean,
}

export default function LightCard(props: Props) {
  const entity = useEntity(props.entity);

  const [dragBrightness, setDragBrightness] = useState<number | null>(null);

  const isUnavailable = isUnavailableState(entity.state);
  const isOn = !isOffState(entity.state);

  const colorModes: string[] = entity.attributes.supported_color_modes ?? [];
  const isDimmable = props.brightness == true && colorModes.some((mode) => mode != "onoff");

  const brightness = dragBrightness ?? (isOn ? Math.round((entity.attributes.brightness ?? 0) / 255 * 100) : 0);

  const toggle = () => {
    if (!isUnavailable)
      entity.service.toggle();
  }

  const changeBrightness = (value: number) => {
    setDragBrightness(null);

    if (value == 0)
      entity.service.turnOff();
    else
      entity.service.turnOn({serviceData: {brightness_pct: value}});
  }

  const header = (
    <Flex align="center" gap="xs">
      <RoundedIcon path={props.icon ?? mdiLightbulb}/>
      <Flex vertical>
        <Typography.Text bold>
          {isUnavailable ? "--" : (isDimmable && isOn ? `${brightness} %` : (isOn ? "On" : "Off"))}
        </Typography.Text>
        <Typography.Text fontSize="sm" textColor="secondary">
          {props.title}
        </Typography.Text>
      </Flex>
    </Flex>
  );

  if (!isDimmable || !isOn) {
    return (
      <Card
        stackCount={1}
        padding="xs"
        clickable
        color={isOn ? "yellow" : undefined}
        onClick={toggle}
      >
        <Flex vertical justify="center" style={{height: "100%"}}>
          {header}
        </Flex>
      </Card>
    )
  }

  return (
    <Card
      stackCount={2}
      padding="xs"
      clickable
      color="yellow"
      onClick={toggle}
    >
      <Flex vertical justify="space-between" style={{height: "100%"}}>
        {header}
        <div data-clickable onClick={(event) => event.stopPropagation()}>
          <Slider
            thumb
            tone="darker"
            style={{
              containerType: "inline-size",
              // Размер фона привязан к ширине всего слайдера (100cqw), чтобы градиент стоял на месте, а не растягивался вместе с заполнением
              ["--slider-range-background" as never]: "linear-gradient(90deg, color-mix(in srgb, var(--color-text-primary-light) 25%, transparent), var(--color-text-primary-light)) left / 100cqw 100% no-repeat",
              ["--slider-thumb-background" as never]: "var(--color-primary)",
            }}
            min={0}
            max={100}
            value={[brightness]}
            disabled={isUnavailable}
            onValueChange={(value) => setDragBrightness(value[0])}
            onValueCommit={(value) => changeBrightness(value[0])}
          />
        </div>
      </Flex>
    </Card>
  )
}
