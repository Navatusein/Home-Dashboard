import {useState} from "react";
import {Card, Flex, RoundedIcon, Slider, Typography} from "@/shared/ui-kit";
import {isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameNumber} from "@/shared/types/ha-domains";

type Props = {
  title: string,
  icon: string,
  entity: EntityNameNumber,
}

export default function NumberCard(props: Props) {
  const entity = useEntity(props.entity);

  const [dragValue, setDragValue] = useState<number | null>(null);

  const isUnavailable = isUnavailableState(entity.state);

  const value = dragValue ?? (isUnavailable ? 0 : Number(entity.state));

  const changeValue = (value: number) => {
    setDragValue(null);
    entity.service.setValue({serviceData: {value: `${value}`}});
  }

  return (
    <Card stackCount={2} padding="xs">
      <Flex vertical justify="space-between" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={props.icon}/>
          <Flex vertical>
            <Typography.Text bold>
              {isUnavailable ? "--" : `${value} ${entity.attributes.unit_of_measurement ?? ""}`}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {props.title}
            </Typography.Text>
          </Flex>
        </Flex>
        <Slider
          thumb
          min={entity.attributes.min ?? 0}
          max={entity.attributes.max ?? 100}
          step={entity.attributes.step ?? 1}
          value={[value]}
          disabled={isUnavailable}
          onValueChange={(value) => setDragValue(value[0])}
          onValueCommit={(value) => changeValue(value[0])}
        />
      </Flex>
    </Card>
  )
}
