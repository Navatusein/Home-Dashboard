"use client"

import {useState} from "react";
import {Card, Flex, Input, Typography} from "@/shared/ui-kit";
import {mdiMagnify} from "@mdi/js";

export default function InputPart() {
  const [value, setValue] = useState("");

  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Input</Typography.Paragraph>

      <Card>
        <Flex vertical gap="sm">
          <Input placeholder="Plain"/>
          <Input
            icon={mdiMagnify}
            placeholder="With icon and clear"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onClear={() => setValue("")}
          />
          <Input shape="round" icon={mdiMagnify} placeholder="Round"/>
          <Input placeholder="Disabled" disabled/>
        </Flex>
      </Card>
    </Flex>
  )
}
