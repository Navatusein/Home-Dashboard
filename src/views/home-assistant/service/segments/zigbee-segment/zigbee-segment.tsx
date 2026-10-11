import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiAlertCircleOutline,
  mdiLinkVariantPlus,
  mdiRestart,
  mdiTagOutline,
  mdiZigbee
} from "@mdi/js";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {baseTextTransformer} from "@/shared/text-transformers/base-text-transformer";

export default function ZigbeeSegment() {
  const isConnected = !useEntityOff("binary_sensor.zigbee2mqtt_bridge_connection_state");
  const isRestartRequired = !useEntityOff("binary_sensor.zigbee2mqtt_bridge_restart_required");

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiZigbee} title="Zigbee2MQTT Bridge" iconColor="yellow"/>
      <StateCard
        title="Bridge Status"
        text={isConnected ? "Connected" : "Disconnected"}
        icon={mdiZigbee}
        color={isConnected ? "yellow" : "red"}
      />
      <Grid columns={2} gap="xs">
        <EntityStateCard
          title="Version"
          icon={mdiTagOutline}
          entity="sensor.zigbee2mqtt_bridge_version"
          textTransformer={baseTextTransformer}
        />
        <StateCard
          title="Restart Required"
          text={isRestartRequired ? "Yes" : "No"}
          icon={mdiAlertCircleOutline}
          color={isRestartRequired ? "orange" : undefined}
        />
        <SwitchCard
          title="Permit Join"
          icon={mdiLinkVariantPlus}
          entity="switch.zigbee2mqtt_bridge_permit_join"
          color="green"
        />
        <ActionCard
          title="Bridge"
          description="Restart"
          icon={mdiRestart}
          entity="button.zigbee2mqtt_bridge_restart"
          confirm
        />
      </Grid>
    </Flex>
  )
}
