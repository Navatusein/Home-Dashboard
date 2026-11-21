import {ReactNode} from "react";
import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import styles from "./track-card.module.scss";

type Props = {
  title: string,
  subtitle: string,
  icon: string,
  image?: string | null,
  color?: ColorToken,
  action?: ReactNode,
  onClick?: () => void,
}

export default function TrackCard(props: Props) {
  return (
    <Card stackCount={1} padding="xs" color={props.color} clickable={!!props.onClick} onClick={props.onClick}>
      <Flex align="center" gap="xs" style={{height: "100%"}}>
        {props.image ? (
          <div className={styles["cover"]} style={{backgroundImage: `url("${props.image}")`}}/>
        ) : (
          <RoundedIcon path={props.icon}/>
        )}
        <Flex vertical grow className={styles["text"]}>
          <Typography.Text bold className={styles["title"]}>
            {props.title}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary" className={styles["title"]}>
            {props.subtitle}
          </Typography.Text>
        </Flex>
        {props.action}
      </Flex>
    </Card>
  )
}
