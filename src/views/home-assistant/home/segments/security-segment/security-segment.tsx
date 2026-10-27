import {Card, Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiSecurity} from "@mdi/js";
import {PersonCard} from "@/widgets/home-assistant-cards/person-card";
import {EntityNamePerson} from "@/shared/types/ha-domains";

type Props = {
  onPersonClick: (person: EntityNamePerson) => void;
}

export default function SecuritySegment(props: Props) {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiSecurity} title="Security"/>
      <Card stackCount={2}>Card Large</Card>
      <Grid columns={2} gap="xs">
        <PersonCard
          personEntity="person.bogdan"
          onClick={() => props.onPersonClick("person.bogdan")}
        />
        <PersonCard
          personEntity="person.iulia"
          onClick={() => props.onPersonClick("person.iulia")}
        />
      </Grid>
    </Flex>
  )
}
