import {Button, Card, Flex, RoundedIcon, Space, Typography} from "@/shared/ui-kit";
import {isUnavailableState, useEntity} from "@hakit/core";
import {mdiArrowDown, mdiArrowUp, mdiRollerShade, mdiRollerShadeClosed, mdiStop} from "@mdi/js";
import {EntityNameCover} from "@/shared/types/ha-domains";

type Props = {
  title: string,
  entity: EntityNameCover,
}

export default function CoverCard(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);
  const isOpen = entity.state != "closed";

  return (
    <Card stackCount={1} padding="xs" color={isOpen ? "blue" : undefined}>
      <Flex align="center" justify="space-between" gap="xs" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={isOpen ? mdiRollerShade : mdiRollerShadeClosed}/>
          <Flex vertical>
            <Typography.Text bold>
              {isUnavailable ? "--" : `${entity.attributes.current_position ?? 0} %`}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {props.title}
            </Typography.Text>
          </Flex>
        </Flex>
        <Space compact>
          <Button
            shape="round"
            icon={mdiArrowUp}
            disabled={isUnavailable}
            onClick={() => entity.service.openCover()}
          />
          <Button
            icon={mdiStop}
            disabled={isUnavailable}
            onClick={() => entity.service.stopCover()}
          />
          <Button
            shape="round"
            icon={mdiArrowDown}
            disabled={isUnavailable}
            onClick={() => entity.service.closeCover()}
          />
        </Space>
      </Flex>
    </Card>
  )
}
