import {Button, Card, Flex, Space, Typography} from "@/shared/ui-kit";
import {mdiAlertCircle} from "@mdi/js";

export default function SpacePart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Space [compact]</Typography.Paragraph>
      <Card>
        <Space vertical gap="sm">
          <Space compact>
            <Button>button 1</Button>
            <Button>button 2</Button>
            <Button>button 3</Button>
            <Button>button 4</Button>
          </Space>

          <Space compact>
            <Button shape="round">button 1</Button>
            <Button shape="round">button 2</Button>
            <Button shape="round">button 3</Button>
            <Button shape="round">button 4</Button>
          </Space>

          <Space gap="sm">
            <Space compact vertical>
              <Button>button 1</Button>
              <Button>button 2</Button>
              <Button>button 3</Button>
              <Button>button 4</Button>
            </Space>

            <Space compact vertical>
              <Button shape="round" icon={mdiAlertCircle}/>
              <Button shape="round" icon={mdiAlertCircle}/>
              <Button shape="round" icon={mdiAlertCircle}/>
              <Button shape="round" icon={mdiAlertCircle}/>
            </Space>
          </Space>
        </Space>
      </Card>
    </Flex>
  )
}
