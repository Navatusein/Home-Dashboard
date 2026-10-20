"use client"

import {useState} from "react";
import {Card, Flex, Segmented, Typography} from "@/shared/ui-kit";

const OPTIONS = [
  {value: "day", text: "Day"},
  {value: "week", text: "Week"},
  {value: "month", text: "Month"},
];

export default function SegmentedPart() {
  const [value, setValue] = useState("day");

  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Segmented</Typography.Paragraph>

      <Card>
        <Flex vertical gap="sm" align="start">
          <Segmented options={OPTIONS} value={value} onChange={setValue}/>
          <Segmented options={OPTIONS} value={value} onChange={setValue} color="blue"/>
          <Segmented options={OPTIONS} value={value} onChange={setValue} color="green"/>
        </Flex>
      </Card>
    </Flex>
  )
}
