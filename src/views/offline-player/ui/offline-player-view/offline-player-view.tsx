"use client"

import {ReactNode, useEffect, useState} from "react";
import {Button, Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {mdiCloudOffOutline, mdiRefresh} from "@mdi/js";
import {PhoneNowPlayingCard} from "@/widgets/home-assistant-cards/now-playing-card";
import {DownloadsList} from "@/widgets/downloads-list";
import styles from "./offline-player-view.module.scss";

type Props = {
  error?: ReactNode,
  delay?: number,
}

export default function OfflinePlayerView(props: Props) {
  const [isVisible, setIsVisible] = useState(!props.delay);

  useEffect(() => {
    if (!props.delay)
      return;

    const timer = setTimeout(() => setIsVisible(true), props.delay);
    return () => clearTimeout(timer);
  }, [props.delay]);

  if (!isVisible)
    return null;

  return (
    <div className={styles["page"]}>
      <Flex vertical gap="sm" className={styles["content"]}>
        <Card padding="xs">
          <Flex align="center" justify="space-between" gap="xs">
            <Flex align="center" gap="xs" className={styles["status"]}>
              <Icon path={mdiCloudOffOutline} size="lg" color="secondary" className={styles["icon"]}/>
              <Flex vertical className={styles["status"]}>
                <Typography.Text bold>
                  Home Assistant is unavailable
                </Typography.Text>
                <Typography.Text fontSize="sm" textColor="secondary" className={styles["error"]}>
                  {props.error ?? "Still connecting…"}
                </Typography.Text>
              </Flex>
            </Flex>
            <Button icon={mdiRefresh} onClick={() => location.reload()}>
              Retry
            </Button>
          </Flex>
        </Card>
        <PhoneNowPlayingCard/>
        <DownloadsList/>
      </Flex>
    </div>
  )
}
