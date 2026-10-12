import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiAirFilter, mdiBroom, mdiMotionSensor, mdiTools, mdiWaterSync} from "@mdi/js";
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
      <ActionCard
        title="Main Brush"
        description="Reset Roborock"
        icon={mdiBroom}
        entity="button.valetudo_roborocks5_reset_main_brush_consumable"
        confirm
      />
      <ActionCard
        title="Side Brush"
        description="Reset Roborock"
        icon={mdiBroom}
        entity="button.valetudo_roborocks5_reset_right_brush_consumable"
        confirm
      />
      <ActionCard
        title="Filter"
        description="Reset Roborock"
        icon={mdiAirFilter}
        entity="button.valetudo_roborocks5_reset_main_filter_consumable"
        confirm
      />
      <ActionCard
        title="Sensors"
        description="Reset Roborock"
        icon={mdiMotionSensor}
        entity="button.valetudo_roborocks5_reset_sensor_cleaning_consumable"
        confirm
      />
    </Flex>
  )
}
