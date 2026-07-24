"use client"

import {Card, Flex, Typography} from "@/shared/ui-kit";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Flex gap="xs" vertical style={{padding: "16px"}}>
      <Card clickable color="yellow" onClick={() => router.push("/ui-kit")}>
        <Typography.Title level={3}>
          UI Kit
        </Typography.Title>
      </Card>
      <Card clickable color="blue" onClick={() => router.push("/home-assistant/home")}>
        <Typography.Title level={3}>
          Home Assistant
        </Typography.Title>
      </Card>
      <Card clickable color="red" onClick={() => router.push("/terminal/main")}>
        <Typography.Title level={3}>
          PC Terminal
        </Typography.Title>
      </Card>
      <Card clickable color="green" onClick={() => router.push("https://develop.navatuseinlab.uk/")}>
        <Typography.Title level={3}>
          Develop
        </Typography.Title>
      </Card>
    </Flex>
  );
}
