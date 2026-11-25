import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiMonitor, mdiMonitorMultiple} from "@mdi/js";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";

export default function MonitorsSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiMonitorMultiple} title="Monitors" iconColor="blue"/>
      <Grid columns={3} gap="xs">
        <SwitchCard
          tall
          title="Left"
          icon={mdiMonitor}
          entity="switch.monitor_left_nas_wr01b"
          powerEntity="sensor.monitor_left_nas_wr01b_power"
          color="teal"
        />
        <SwitchCard
          tall
          title="Central"
          icon={mdiMonitor}
          entity="switch.monitor_sentral_nas_wr01b"
          powerEntity="sensor.monitor_sentral_nas_wr01b_power"
          color="teal"
        />
        <SwitchCard
          tall
          title="Right"
          icon={mdiMonitor}
          entity="switch.monitor_right_nas_wr01b"
          powerEntity="sensor.monitor_right_nas_wr01b_power"
          color="teal"
        />
      </Grid>
    </Flex>
  )
}
