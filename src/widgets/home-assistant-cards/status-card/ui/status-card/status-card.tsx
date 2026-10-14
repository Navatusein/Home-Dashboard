import {Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import {EntityName, useEntity} from "@hakit/core";
import {baseTextTransformer, TextTransformer} from "@/shared/text-transformers/base-text-transformer";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import styles from "./status-card.module.scss";

type Props = {
  title: string,
  icon: string,
  iconColor?: ColorToken | 'secondary',
  entity: EntityName,
  textTransformer?: TextTransformer,
  onClick?: () => void,
}

export default function StatusCard(props: Props) {
  const entity = useEntity(props.entity);
  const isMobile = useBreakpoint("sm");

  const transformer = props.textTransformer ?? baseTextTransformer;

  return (
    <Card outline clickable padding="xs" onClick={props.onClick}>
      <Flex gap="xs" className={styles["content"]}>
        <Icon className={styles["icon"]} path={props.icon} size={isMobile ? "lg" : "xl"} color={props.iconColor}/>
        <Flex vertical className={styles["content"]}>
          <Typography.Text className={styles["title"]} fontSize="sm" textColor={isMobile ? "secondary" : undefined}>
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
