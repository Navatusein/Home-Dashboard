import {Card, Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiSecurity} from "@mdi/js";
import {PersonCard} from "@/widgets/home-assistant-cards/person-card";

export default function SecuritySegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiSecurity} title="Security"/>
      <Card stackCount={2}>Card Large</Card>
      <Grid columns={2} gap="xs">
        <PersonCard personEntity="person.bogdan"/>
        <PersonCard personEntity="person.iulia"/>
      </Grid>
    </Flex>
  )
}
