import {Card, Flex, RoundedIcon, Space, Typography} from "@/shared/ui-kit";
import {mdiLightbulbGroup, mdiSecurity, mdiWindowOpenVariant} from "@mdi/js";

export default function RoundedIconPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Rounded Icon</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <RoundedIcon path={mdiWindowOpenVariant}/>
          <RoundedIcon path={mdiSecurity} color="red"/>
          <RoundedIcon path={mdiLightbulbGroup} color="yellow"/>
        </Space>
      </Card>
    </Flex>
  )
}
