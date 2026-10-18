import {Flex, ResponsiveToggler, SegmentHeader} from "@/shared/ui-kit";
import {mdiMapMarker} from "@mdi/js";
import {MapCard} from "@/widgets/home-assistant-cards/map-card";
import {EntityNamePerson} from "@/shared/types/ha-domains";

const PERSONS: EntityNamePerson[] = ["person.bogdan", "person.iulia"];

export default function MapSegment() {
  return (
    <ResponsiveToggler breakpoint="sm" hide>
      <Flex gap="xs" vertical style={{height: "100%"}}>
        <SegmentHeader icon={mdiMapMarker} title="Map"/>
        <MapCard persons={PERSONS}/>
      </Flex>
    </ResponsiveToggler>
  )
}
