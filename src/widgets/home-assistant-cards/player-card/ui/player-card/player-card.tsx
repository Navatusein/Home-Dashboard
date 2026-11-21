import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {isUnavailableState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {EntityNameMediaPlayer} from "@/shared/types/ha-domains";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";

type Props = {
  title?: string,
  icon: string,
  entity: EntityNameMediaPlayer,
  onClick: () => void,
}

export default function PlayerCard(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);

  return (
    <Card
      stackCount={1}
      padding="xs"
      clickable={!isUnavailable}
      onClick={() => !isUnavailable && props.onClick()}
    >
      <Flex align="center" gap="xs" style={{height: "100%"}}>
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
    </Card>
  )
}
