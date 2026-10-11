import {Card, Flex, Switch, Typography} from "@/shared/ui-kit";

export default function SwitchPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Switch</Typography.Paragraph>

      <Card>
        <Flex gap="sm" align="center">
          <Switch/>
          <Switch defaultChecked/>
          <Switch defaultChecked color="green"/>
          <Switch defaultChecked color="yellow"/>
          <Switch defaultChecked color="red"/>
          <Switch disabled/>
          <Switch defaultChecked disabled/>
        </Flex>
      </Card>

      <Typography.Paragraph>Switch Tone</Typography.Paragraph>

      <Card color="purple">
        <Flex gap="sm" align="center">
          <Switch defaultChecked color="purple" tone="darker"/>
          <Switch defaultChecked color="purple" tone="lighter"/>
        </Flex>
      </Card>
    </Flex>
  )
}
