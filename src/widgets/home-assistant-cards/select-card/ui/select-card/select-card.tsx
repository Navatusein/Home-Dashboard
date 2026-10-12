import {Card, Flex, RoundedIcon, Select, Typography} from "@/shared/ui-kit";
import {isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameSelect} from "@/shared/types/ha-domains";

type Props = {
  title: string,
  icon: string,
  entity: EntityNameSelect,
}

export default function SelectCard(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);

  const items = ((entity.attributes.options ?? []) as string[])
    .map((option) => ({key: option, value: option, label: option}));

  return (
    <Card stackCount={1} padding="xs">
      <Flex align="center" justify="space-between" gap="xs" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={props.icon}/>
          <Typography.Text>
            {props.title}
          </Typography.Text>
        </Flex>
        <Select
          items={items}
          value={isUnavailable ? undefined : entity.state}
          disabled={isUnavailable}
          placeholder="--"
          onValueChange={(option) => entity.service.selectOption({serviceData: {option: option}})}
        />
      </Flex>
    </Card>
  )
}
