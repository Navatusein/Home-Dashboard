import {Card, Flex, Space, Typography} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {mdiLightbulbGroup, mdiSecurity, mdiWindowOpenVariant} from "@mdi/js";

export default function ChipsPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Chips</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <Chips text="chips"/>
          <Chips text="" icon={mdiLightbulbGroup}/>
          <Chips text="icon" icon={mdiLightbulbGroup}/>
          <Chips text="icon color" color="blue" icon={mdiSecurity}/>
          <Chips text="icon color clickable" color="teal" icon={mdiWindowOpenVariant} clickable/>
        </Space>
      </Card>
    </Flex>
  )
}
