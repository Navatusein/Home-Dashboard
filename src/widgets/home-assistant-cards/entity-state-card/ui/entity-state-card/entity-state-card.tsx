import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameSensor} from "@/shared/types/ha-domains";
import {TextTransformer} from "@/shared/text-transformers/base-text-transformer";
import {roundTextTransformer} from "@/shared/text-transformers/number-text-transformer";
import {ColorToken} from "@/shared/constants/colors";

type Props = {
  title: string,
  entity: EntityNameSensor,
  icon?: string,
  iconColor?: ColorToken,
  textTransformer?: TextTransformer,
  unit?: string,
}

export default function EntityStateCard(props: Props) {
  const entity = useEntity(props.entity);

  const transformer = props.textTransformer ?? roundTextTransformer;
  const isUnavailable = isUnavailableState(entity.state);

  return (
    <Card stackCount={1} padding={props.icon ? "xs" : "sm"}>
      <Flex align="center" gap="xs" style={{height: "100%"}}>
        {props.icon && (
          <RoundedIcon path={props.icon} iconColor={props.iconColor}/>
        )}
        <Flex vertical>
          <Typography.Text bold>
            {isUnavailable ? "--" : transformer(entity.state)}
            {!isUnavailable && (
              <Typography.Text fontSize="xs" textColor="secondary">
                {` ${props.unit ?? entity.attributes.unit_of_measurement ?? ""}`}
              </Typography.Text>
            )}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary">
            {props.title}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  )
}
