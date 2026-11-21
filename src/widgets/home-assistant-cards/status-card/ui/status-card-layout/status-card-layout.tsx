import {Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import styles from "./status-card-layout.module.scss";

type Props = {
  title: string,
  text: string,
  icon: string,
  iconColor?: ColorToken | 'secondary',
  onClick?: () => void,
}

export default function StatusCardLayout(props: Props) {
  const isMobile = useBreakpoint("sm");

  return (
    <Card outline clickable padding="xs" onClick={props.onClick}>
      <Flex gap="xs" className={styles["content"]}>
        <Icon className={styles["icon"]} path={props.icon} size={isMobile ? "lg" : "xl"} color={props.iconColor}/>
        <Flex vertical className={styles["content"]}>
          <Typography.Text className={styles["title"]} fontSize="sm" textColor={isMobile ? "secondary" : undefined}>
            {props.title}
          </Typography.Text>
          <Typography.Text bold>
            {props.text}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  )
}
