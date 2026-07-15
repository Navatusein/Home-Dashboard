import {BootstrapGrid, Card, Flex, Typography} from "@/shared/ui-kit";

export default function BootstrapGridPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>BootstrapGrid</Typography.Paragraph>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={8}>
          <Card>
            <Typography.Paragraph>Card 1</Typography.Paragraph>
          </Card>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8}>
          <Card>
            <Typography.Paragraph>Card 2</Typography.Paragraph>
          </Card>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8}>
          <Card>
            <Typography.Paragraph>Card 3</Typography.Paragraph>
          </Card>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8}>
          <Card>
            <Typography.Paragraph>Card 4</Typography.Paragraph>
          </Card>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
    </Flex>
  )
}
