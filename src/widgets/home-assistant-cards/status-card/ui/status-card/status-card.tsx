import {Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import {EntityName, useEntity} from "@hakit/core";
import {baseTextTransformer, TextTransformer} from "@/shared/text-transformers/base-text-transformer";

type Props = {
  title: string,
  icon: string,
  iconColor?: ColorToken | 'secondary',
  entity: EntityName,
  textTransformer?: TextTransformer,
}

export default function StatusCard(props: Props) {
  const entity = useEntity(props.entity);

  const transformer = props.textTransformer ?? baseTextTransformer;

  return (
    <Card outline clickable padding="xs">
      <Flex gap="xs">
        <Icon path={props.icon} size="xl" color={props.iconColor}/>
        <Flex vertical>
          <Typography.Text fontSize="sm">
            {props.title}
          </Typography.Text>
          <Typography.Text bold>
            {transformer(entity.state)}{entity.attributes.unit_of_measurement}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  )
}
