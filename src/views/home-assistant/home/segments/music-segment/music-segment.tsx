import {Card, Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiMusic} from "@mdi/js";

type Props = {}

export default function MusicSegment(props: Props) {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiMusic} title="Music"/>
      <Grid columns={2} gap="xs">
        <Card stackCount={1}>Card 1</Card>
        <Card stackCount={1}>Card 2</Card>
      </Grid>
      <Grid columns={6} gap="xs">
        <Card stackCount={1}>1</Card>
        <Card stackCount={1}>2</Card>
        <Card stackCount={1}>3</Card>
        <Card stackCount={1}>4</Card>
        <Card stackCount={1}>5</Card>
        <Card stackCount={1}>6</Card>
      </Grid>
    </Flex>
  )
}
