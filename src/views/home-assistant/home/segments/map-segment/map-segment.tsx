import {Flex, ResponsiveToggler, SegmentHeader} from "@/shared/ui-kit";
import {mdiMapMarker} from "@mdi/js";
import {MapCard} from "@/widgets/home-assistant-cards/map-card";

export default function MapSegment() {
  return (
    <ResponsiveToggler breakpoint="sm" hide>
      <Flex gap="xs" vertical style={{height: "100%"}}>
        <SegmentHeader icon={mdiMapMarker} title="Map"/>
        <MapCard center={[50.45969312150685, 30.364284507388952]}/>
      </Flex>
    </ResponsiveToggler>
  )
}
