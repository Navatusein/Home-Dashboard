import {Button, Card, Flex, Grid, RoundedIcon, Typography} from "@/shared/ui-kit";
import {mdiMusic, mdiPause, mdiPlay, mdiSkipNext, mdiSkipPrevious} from "@mdi/js";
import styles from "./media-card-layout.module.scss";

type Props = {
  title: string,
  subtitle: string,
  image?: string,
  isPlaying: boolean,
  disabled?: boolean,
  onPrevious: () => void,
  onPlayPause: () => void,
  onNext: () => void,
}

export default function MediaCardLayout(props: Props) {
  return (
    <Card stackCount={2} padding="xs" color={props.isPlaying ? "green" : undefined}>
      <Flex vertical justify="space-between" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          {props.image ? (
            <div className={styles["cover"]} style={{backgroundImage: `url("${props.image}")`}}/>
          ) : (
            <RoundedIcon path={mdiMusic}/>
          )}
          <Flex vertical className={styles["text"]}>
            <Typography.Text bold className={styles["title"]}>
              {props.title}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary" className={styles["title"]}>
              {props.subtitle}
            </Typography.Text>
          </Flex>
        </Flex>
        <Grid columns={3} gap="xs">
          <Button
            shape="round"
            icon={mdiSkipPrevious}
            className={styles["button"]}
            disabled={props.disabled}
            onClick={props.onPrevious}
          />
          <Button
            shape="round"
            icon={props.isPlaying ? mdiPause : mdiPlay}
            className={styles["button"]}
            disabled={props.disabled}
            onClick={props.onPlayPause}
          />
          <Button
            shape="round"
            icon={mdiSkipNext}
            className={styles["button"]}
            disabled={props.disabled}
            onClick={props.onNext}
          />
        </Grid>
      </Flex>
    </Card>
  )
}
