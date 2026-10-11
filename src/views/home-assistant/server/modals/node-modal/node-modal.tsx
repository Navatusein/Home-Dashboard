import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {
  mdiAlertCircleOutline,
  mdiChartBox,
  mdiCog,
  mdiCpu64Bit,
  mdiCubeOutline,
  mdiFlash,
  mdiGauge,
  mdiHarddisk,
  mdiMemory,
  mdiMonitor,
  mdiPower,
  mdiPowerOn,
  mdiPowerPlug,
  mdiRestart,
  mdiServer,
  mdiServerOff,
  mdiTagOutline,
  mdiUpdate
} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {ColorToken} from "@/shared/constants/colors";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";

type Props = {
  title: string;
  node: string;
  color: ColorToken;
}

export default function NodeModal(props: Props) {
  const isOnline = !useEntityOff(`binary_sensor.node_${props.node}_status`);
  const version = useEntity(`sensor.node_${props.node}_version`);
  const updates = useEntity(`sensor.node_${props.node}_total_updates`);

  return (
    <QueryModalControl modal={props.node}>
      <ModalPopUp.Header title={props.title} icon={mdiServer}>
        <Flex justify="center" gap="xs">
          <Chips
            text={isOnline ? "Online" : "Offline"}
            icon={isOnline ? mdiServer : mdiServerOff}
            iconColor={isOnline ? "green" : "red"}
          />
          <Chips
            text={version.state}
            icon={mdiTagOutline}
            iconColor="blue"
          />
          <Chips
            text={`${updates.state} updates`}
            icon={mdiUpdate}
            iconColor="orange"
          />
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiPowerPlug} title="Power" iconColor="yellow"/>
          <Grid columns={2} gap="xs">
            <SwitchCard
              title="Socket"
              icon={mdiPowerPlug}
              entity={`switch.${props.node}_nas_wr01b`}
              color={props.color}
              confirmOff
            />
            <EntityStateCard
              title="Consumption"
              icon={mdiFlash}
              entity={`sensor.${props.node}_nas_wr01b_power`}
            />
          </Grid>
          <SegmentHeader icon={mdiCog} title="Controls" iconColor="red"/>
          <Grid columns={2} gap="xs">
            {isOnline ? (
              <>
                <ActionCard
                  title="Shutdown"
                  description="Power off"
                  icon={mdiPower}
                  entity={`button.node_${props.node}_shutdown`}
                  confirm
                />
                <ActionCard
                  title="Reboot"
                  description="Restart"
                  icon={mdiRestart}
                  entity={`button.node_${props.node}_reboot`}
                  confirm
                />
              </>
            ) : (
              <ActionCard
                title="Wake"
                description="Wake-on-LAN"
                icon={mdiPowerOn}
                entity={`button.node_${props.node}_wake_on_lan`}
              />
            )}
          </Grid>
          <SegmentHeader icon={mdiChartBox} title="Stats" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <EntityStateCard
              title="Processor"
              icon={mdiCpu64Bit}
              entity={`sensor.node_${props.node}_cpu_used`}
            />
            <EntityStateCard
              title="Memory Use"
              icon={mdiMemory}
              entity={`sensor.node_${props.node}_memory_used_percentage`}
            />
            <EntityStateCard
              title="Disk Use"
              icon={mdiHarddisk}
              entity={`sensor.node_${props.node}_disk_used_percentage`}
            />
            <EntityStateCard
              title="Memory Free"
              icon={mdiMemory}
              entity={`sensor.node_${props.node}_memory_free`}
              textTransformer={numberFixedTextTransformerProvider(1)}
            />
            <EntityStateCard
              title="Load"
              icon={mdiGauge}
              entity={`sensor.node_${props.node}_load_average_1_min`}
              textTransformer={numberFixedTextTransformerProvider(2)}
            />
            <EntityStateCard
              title="Failed Tasks"
              icon={mdiAlertCircleOutline}
              entity={`sensor.node_${props.node}_failed_tasks`}
            />
            <EntityStateCard
              title="VMs"
              icon={mdiMonitor}
              entity={`sensor.node_${props.node}_virtual_machines_running`}
            />
            <EntityStateCard
              title="LXCs"
              icon={mdiCubeOutline}
              entity={`sensor.node_${props.node}_containers_running`}
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
