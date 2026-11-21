import {Card, Flex, RoundedIcon, Switch, Typography} from "@/shared/ui-kit";
import {isUnavailableState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";

const SUPPORT_GROUPING = 524288;

type Props = {
  title?: string,
  icon: string,
  entity: EntityNameMediaPlayer,
  checked: boolean,
  disabled?: boolean,
  onChange: (checked: boolean) => void,
}

export default function GroupMemberCard(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);
  const canGroup = ((entity.attributes.supported_features ?? 0) & SUPPORT_GROUPING) != 0;
  const isDisabled = props.disabled || isUnavailable || !canGroup;

  return (
    <Card
      stackCount={1}
      padding="xs"
      clickable={!isDisabled}
      color={props.checked ? "purple" : undefined}
      onClick={() => !isDisabled && props.onChange(!props.checked)}
    >
      <Flex align="center" justify="space-between" gap="xs" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={props.icon}/>
          <Flex vertical>
            <Typography.Text bold>
              {props.title ?? entity.attributes.friendly_name}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {pascalCaseTextTransformer(entity.state)}
            </Typography.Text>
          </Flex>
        </Flex>
        <Switch
          checked={props.checked}
          disabled={isDisabled}
          color="purple"
          tone={props.checked ? "darker" : undefined}
        />
      </Flex>
    </Card>
  )
}
