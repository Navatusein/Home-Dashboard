import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

export default function SegmentFastLaunch() {
  return (
    <>
      <AgentDisabledProvider>
        <Grid.Section rowStart={4}>
          <ButtonButton entity="button.navatusein_pc_launch_task_manager" image="/applications/Task Manager.png"/>
          <ButtonButton entity="button.navatusein_pc_launch_settings" image="/applications/Settings.png"/>
          <ButtonButton entity="button.navatusein_pc_launch_control_panel" image="/applications/Control Panel.png"/>
        </Grid.Section>

        <Grid.Section rowStart={5}>
          <ButtonButton entity="button.navatusein_pc_launch_sharex" image="/applications/ShareX.png"/>
          <ButtonButton entity="button.navatusein_pc_launch_powertoys" image="/applications/PowerToys.png"/>
          <ButtonButton entity="button.navatusein_pc_launch_syncthing" image="/applications/Syncthing.png"/>
        </Grid.Section>
      </AgentDisabledProvider>
    </>
  )
}
