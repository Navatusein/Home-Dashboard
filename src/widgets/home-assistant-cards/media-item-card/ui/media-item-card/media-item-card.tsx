import {Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import styles from "./media-item-card.module.scss";

type Props = {
  title: string,
  icon: string,
  image?: string,
  onClick?: () => void,
}

export default function MediaItemCard(props: Props) {
  return (
    <Card padding="xs" clickable className={styles["card"]} onClick={props.onClick}>
      <Flex vertical gap="xs">
        <div className={styles["cover"]} style={props.image ? {backgroundImage: `url("${props.image}")`} : undefined}>
          {!props.image && (
            <Icon path={props.icon} size="xl" color="secondary"/>
          )}
        </div>
        <Typography.Text fontSize="sm" className={styles["title"]}>
          {props.title}
        </Typography.Text>
      </Flex>
    </Card>
  )
}
