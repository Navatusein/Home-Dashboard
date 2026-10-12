import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiDesktopTowerMonitor,
  mdiFlash,
  mdiLock,
  mdiMonitorOff,
  mdiMouse,
  mdiPower,
  mdiPowerOn,
  mdiPowerPlug,
  mdiRestart
} from "@mdi/js";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

export default function PowerSegment() {
  const isComputerOn = !useEntityOff("binary_sensor.navatusein_pc_pc_running");

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiPower} title="Power" iconColor="red"/>
      <Grid columns={2} gap="xs">
        <Grid.Element rowSpan={2}>
          <StateCard
            tall
            title="Computer"
            text={isComputerOn ? "On" : "Off"}
            icon={isComputerOn ? mdiDesktopTowerMonitor : mdiMonitorOff}
            color={isComputerOn ? "teal" : undefined}
          />
        </Grid.Element>
        <SwitchCard
          title="Socket"
          icon={mdiPowerPlug}
          entity="switch.pc_nas_wr01b"
          color="teal"
          confirmOff
        />
        <EntityStateCard
          title="Consumption"
          icon={mdiFlash}
          entity="sensor.pc_nas_wr01b_power"
        />
        {isComputerOn ? (
          <>
            <ActionCard
              title="Lock"
              description="Lock session"
              icon={mdiLock}
              entity="button.navatusein_pc_lock_pc"
            />
            <ActionCard
              title="Restart"
              description="Reboot"
              icon={mdiRestart}
              entity="button.navatusein_pc_restart_pc"
              confirm
            />
            <ActionCard
              title="Shutdown"
              description="Power off"
              icon={mdiPower}
              entity="button.navatusein_pc_shutdown_pc"
              confirm
            />
          </>
        ) : (
          <ActionCard
            title="Wake"
            description="Wake-on-LAN"
            icon={mdiPowerOn}
            entity="script.wol_navatusein_pc"
          />
        )}
        <EntityStateCard
          title="Mouse Battery"
          icon={mdiMouse}
          entity="sensor.navatusein_pc_g_pro_mouse_battery"
        />
      </Grid>
    </Flex>
  )
}
