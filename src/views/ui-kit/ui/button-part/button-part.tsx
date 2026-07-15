import {Button, Card, Flex, Grid, Space, Typography} from "@/shared/ui-kit";
import {mdiAlertCircle} from "@mdi/js";

export default function ButtonPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Button [color]</Typography.Paragraph>
      <Card>
        <Grid columns={7} gap="sm">
          <Button style={{width: "100%"}}>Button default</Button>
          <Button style={{width: "100%"}} color="purple">Button purple</Button>
          <Button style={{width: "100%"}} color="yellow">Button yellow</Button>
          <Button style={{width: "100%"}} color="orange">Button orange</Button>
          <Button style={{width: "100%"}} color="red">Button red</Button>
          <Button style={{width: "100%"}} color="green">Button green</Button>
          <Button style={{width: "100%"}} color="blue">Button blue</Button>
          <Button style={{width: "100%"}} color="teal">Button teal</Button>
          <Button style={{width: "100%"}} color="pink">Button pink</Button>
        </Grid>
      </Card>
      <Typography.Paragraph>Button [icon]</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <Button icon={mdiAlertCircle}>
            mdiAlertCircle
          </Button>
          <Button icon={mdiAlertCircle} color="blue">
            mdiAlertCircle
          </Button>
          <Button icon={mdiAlertCircle} color="blue"/>
          <Button icon={mdiAlertCircle} color="teal" shape="round"/>
          <Button icon={mdiAlertCircle} color="pink" shape="round">
            mdiAlertCircle
          </Button>
          <Button color="purple" shape="round">
            mdiAlertCircle
          </Button>
        </Space>
      </Card>
    </Flex>
  )
}
