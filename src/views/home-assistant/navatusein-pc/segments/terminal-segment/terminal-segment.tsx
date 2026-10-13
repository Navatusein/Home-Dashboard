import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiCodeBraces, mdiMonitor, mdiTabletDashboard, mdiViewDashboard} from "@mdi/js";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";

export default function TerminalSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTabletDashboard} title="Terminal" iconColor="purple"/>
      <Grid columns={2} gap="xs">
        <Grid.Element rowSpan={2}>
          <SwitchCard
            tall
            title="Screen"
            icon={mdiMonitor}
            entity="switch.pc_terminal_screen"
            color="purple"
          />
        </Grid.Element>
        <ActionCard
          title="Main Page"
          description="Open"
          icon={mdiViewDashboard}
          entity="script.dev_show_main_terminal_page"
        />
        <ActionCard
          title="Dev Page"
          description="Open"
          icon={mdiCodeBraces}
          entity="script.dev_show_dev_terminal_page"
        />
      </Grid>
    </Flex>
  )
}
