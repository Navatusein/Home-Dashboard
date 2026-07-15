import {Card, Flex, Grid, Typography} from "@/shared/ui-kit";

export default function GridPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Grid</Typography.Paragraph>
      <Grid columns={3} gap="sm">
        <Grid.Element rowSpan={2}>
          <Card style={{height: "100%"}}>
            <Typography.Paragraph>Card 1</Typography.Paragraph>
          </Card>
        </Grid.Element>
        <Grid.Element>
          <Card>
            <Typography.Paragraph>Card 2</Typography.Paragraph>
          </Card>
        </Grid.Element>
        <Grid.Element>
          <Card>
            <Typography.Paragraph>Card 3</Typography.Paragraph>
          </Card>
        </Grid.Element>
        <Grid.Element>
          <Card>
            <Typography.Paragraph>Card 4</Typography.Paragraph>
          </Card>
        </Grid.Element>
      </Grid>
    </Flex>
  )
}
