import {Card, Flex, Grid, SegmentHeader, Typography} from "@/shared/ui-kit";
import {mdiShieldHome} from "@mdi/js";

export default function SegmentHeaderPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Segment Header</Typography.Paragraph>
      <Card>
        <Grid columns={3} gap="sm">
          <SegmentHeader title="Without icon and link"/>
          <SegmentHeader icon={mdiShieldHome} title="With icon"/>
          <SegmentHeader icon={mdiShieldHome} title="With icon and link" link="123"/>
        </Grid>
      </Card>
    </Flex>
  )
}
