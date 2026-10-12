import {Flex, ResponsiveToggler, SegmentHeader} from "@/shared/ui-kit";
import {mdiMapMarker} from "@mdi/js";
import {MapCard, MapCardPerson} from "@/widgets/home-assistant-cards/map-card";

const PERSONS: MapCardPerson[] = [
  {entity: "person.bogdan", imageUrl: "/users/bohdan.jpg"},
  {entity: "person.iulia", imageUrl: "/users/julia.png"},
]

export default function MapSegment() {
  return (
    <ResponsiveToggler breakpoint="sm" hide>
      <Flex gap="xs" vertical style={{height: "100%"}}>
        <SegmentHeader icon={mdiMapMarker} title="Map"/>
        <MapCard
          center={[50.45969312150685, 30.364284507388952]}
          persons={PERSONS}
        />
      </Flex>
    </ResponsiveToggler>
  )
}
