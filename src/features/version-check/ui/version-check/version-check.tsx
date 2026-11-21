"use client"

import {useEffect, useState} from "react";
import {Button, Card, Flex, Typography} from "@/shared/ui-kit";
import {mdiRefresh} from "@mdi/js";
import styles from "./version-check.module.scss";

const CHECK_INTERVAL = 60_000;

export default function VersionCheck() {
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const check = () => {
      fetch("/api/version", {cache: "no-store"})
        .then((response) => response.json())
        .then((server: {version?: string}) => setIsOutdated(!!server.version && server.version != process.env.BUILD_ID))
        .catch(() => {});
    }

    const checkWhenVisible = () => {
      if (document.visibilityState == "visible")
        check();
    }

    const timer = setInterval(check, CHECK_INTERVAL);
    document.addEventListener("visibilitychange", checkWhenVisible);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", checkWhenVisible);
    }
  }, []);

  if (!isOutdated)
    return null;

  return (
    <Card padding="xs" className={styles["banner"]}>
      <Flex align="center" justify="space-between" gap="sm">
        <Typography.Text style={{padding: "0 4px"}}>
          New version available
        </Typography.Text>
        <Button color="purple" icon={mdiRefresh} onClick={() => location.reload()}>
          Update
        </Button>
      </Flex>
    </Card>
  )
}
