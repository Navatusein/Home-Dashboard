import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiTools, mdiWaterSync} from "@mdi/js";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";

export default function ToolsSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTools} title="Tools" iconColor="orange"/>
      <ActionCard
        title="Water Dispensers"
        description="Reset Mi Pet"
        icon={mdiWaterSync}
        entity="script.tools_reset_mi_pet_water_dispensers"
        confirm
      />
    </Flex>
  )
}
