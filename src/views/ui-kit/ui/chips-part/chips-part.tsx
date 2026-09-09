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
          <Chips text="icon color" iconColor="blue" icon={mdiSecurity}/>
          <Chips text="icon color clickable" iconColor="teal" icon={mdiWindowOpenVariant} clickable/>
        </Space>
      </Card>
      <Typography.Paragraph>Chips [color]</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <Chips text="default" icon={mdiSecurity}/>
          <Chips text="purple" icon={mdiSecurity} color="purple"/>
          <Chips text="yellow" icon={mdiSecurity} color="yellow"/>
          <Chips text="orange" icon={mdiSecurity} color="orange"/>
          <Chips text="red" icon={mdiSecurity} color="red"/>
          <Chips text="green" icon={mdiSecurity} color="green"/>
          <Chips text="blue" icon={mdiSecurity} color="blue"/>
          <Chips text="teal" icon={mdiSecurity} color="teal"/>
          <Chips text="pink" icon={mdiSecurity} color="pink"/>
          <Chips text="secondary" icon={mdiSecurity} color="secondary"/>
          <Chips text="clickable" icon={mdiSecurity} color="green" clickable/>
        </Space>
      </Card>
    </Flex>
  )
}
