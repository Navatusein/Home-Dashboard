import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiDesktopTower, mdiPowerSocketEu} from "@mdi/js";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";

export default function SocketsSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiPowerSocketEu} title="Sockets" iconColor="yellow"/>
      <Grid columns={2} gap="xs">
        <SwitchCard
          title="PC Group"
          icon={mdiPowerSocketEu}
          entity="switch.pc_group_nas_wr01b"
          powerEntity="sensor.pc_group_nas_wr01b_power"
          color="teal"
          confirmOff
        />
        <SwitchCard
          title="PC"
          icon={mdiDesktopTower}
          entity="switch.pc_nas_wr01b"
          powerEntity="sensor.pc_nas_wr01b_power"
          color="teal"
          confirmOff
        />
      </Grid>
    </Flex>
  )
}
