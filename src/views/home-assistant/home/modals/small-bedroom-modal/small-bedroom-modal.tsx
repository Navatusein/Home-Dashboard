import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBedQueen,
  mdiDeskLamp,
  mdiDesktopTowerMonitor,
  mdiDevices,
  mdiLightbulbGroup,
  mdiLock,
  mdiMonitorOff,
  mdiMotionSensor,
  mdiPower,
  mdiRollerShade,
  mdiThermostat,
  mdiWindowClosedVariant
} from "@mdi/js";
import {useUser} from "@hakit/core";
import {useRouter} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {Chips} from "@/shared/ui-kit/chips";
import {ClimateCard} from "@/widgets/home-assistant-cards/climate-card";
import {LightCard} from "@/widgets/home-assistant-cards/light-card";
import {CoverCard} from "@/widgets/home-assistant-cards/cover-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

export default function SmallBedroomModal() {
  const router = useRouter();

  const isComputerOn = !useEntityOff("binary_sensor.navatusein_pc_pc_running");
  const canOpenPc = useUser()?.name == "Bohdan";

  return (
    <QueryModalControl modal="small-bedroom">
      <ModalPopUp.Header title="Small Bedroom" icon={mdiBedQueen}>
        <Flex justify="center" gap="xs">
          <Chips text="19 minutes ago" icon={mdiMotionSensor} iconColor="blue"/>
          <Chips text="Closed" icon={mdiWindowClosedVariant} iconColor="green"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiThermostat} title="Climate" iconColor="blue"/>
          <Grid columns={1} gap="xs">
            <ClimateCard 
              climateEntity="climate.small_bedroom_ac"
              title="Air Conditioner"
            />
          </Grid>
          <SegmentHeader icon={mdiLightbulbGroup} title="Light" iconColor="yellow"/>
          <Grid columns={1} gap="xs">
            <LightCard
              title="Monitor Light Bar"
              icon={mdiDeskLamp}
              entity="light.yeelink_lamp22_1bc5_light"
            />
          </Grid>
          <SegmentHeader icon={mdiRollerShade} title="Blinds" iconColor="blue"/>
          <Grid columns={1} gap="xs">
            <CoverCard
              title="Window"
              entity="cover.small_bedroom_am43"
            />
          </Grid>
          <SegmentHeader icon={mdiDevices} title="Devices" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <Grid.Element rowSpan={2}>
              <StateCard
                tall
                title="Computer"
                text={isComputerOn ? "On" : "Off"}
                icon={isComputerOn ? mdiDesktopTowerMonitor : mdiMonitorOff}
                color={isComputerOn ? "teal" : undefined}
                onClick={canOpenPc ? () => router.push("/home-assistant/navatusein-pc") : undefined}
              />
            </Grid.Element>
            <ActionCard
              title="Lock"
              description="Lock session"
              icon={mdiLock}
              entity="button.navatusein_pc_lock_pc"
            />
            <ActionCard
              title="Shutdown"
              description="Power off"
              icon={mdiPower}
              entity="button.navatusein_pc_shutdown_pc"
              confirm
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
