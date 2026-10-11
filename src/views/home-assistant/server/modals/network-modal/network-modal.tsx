import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {
  mdiAccessPoint,
  mdiAccountMultiple,
  mdiCog,
  mdiLan,
  mdiRestart,
  mdiRouterNetwork,
  mdiShapeOutline,
  mdiShieldOutline,
  mdiSwapHorizontal,
  mdiSwitch,
  mdiWifi
} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import NetworkSwitchList from "../../ui/network-switch-list/network-switch-list";

export default function NetworkModal() {
  const gatewayState = useEntity("sensor.cloud_gateway_fiber_state");
  const switchState = useEntity("sensor.usw_flex_2_5g_5_state");
  const accessPointState = useEntity("sensor.u7_pro_state");

  return (
    <QueryModalControl modal="network">
      <ModalPopUp.Header title="Network" icon={mdiLan}>
        <Flex justify="center" gap="xs">
          <Chips
            text="Gateway"
            icon={mdiRouterNetwork}
            iconColor={gatewayState.state == "connected" ? "green" : "red"}
          />
          <Chips
            text="Switch"
            icon={mdiSwitch}
            iconColor={switchState.state == "connected" ? "green" : "red"}
          />
          <Chips
            text="AP"
            icon={mdiAccessPoint}
            iconColor={accessPointState.state == "connected" ? "green" : "red"}
          />
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiWifi} title="Wi-Fi" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <SwitchCard
              title="Main"
              icon={mdiWifi}
              entity="switch.masyasys_enabled"
              color="teal"
              confirmOff
            />
            <EntityStateCard
              title="Main Clients"
              icon={mdiAccountMultiple}
              entity="sensor.masyasys_clients"
            />
            <SwitchCard
              title="IoT"
              icon={mdiWifi}
              entity="switch.masyasys_iot_enabled"
              color="teal"
              confirmOff
            />
            <EntityStateCard
              title="IoT Clients"
              icon={mdiAccountMultiple}
              entity="sensor.masyasys_iot_clients"
            />
            <SwitchCard
              title="Guest"
              icon={mdiWifi}
              entity="switch.masyasys_guest_enabled"
              color="teal"
            />
            <EntityStateCard
              title="Guest Clients"
              icon={mdiAccountMultiple}
              entity="sensor.masyasys_guest_clients"
            />
          </Grid>
          <NetworkSwitchList
            title="Port Forwarding"
            icon={mdiSwapHorizontal}
            color="blue"
            entityPrefix="switch.unifi_network_port_forwarding_"
            namePrefix="UniFi Network Port Forwarding "
          />
          <NetworkSwitchList
            title="Objects"
            icon={mdiShapeOutline}
            color="purple"
            entityPrefix="switch.unifi_network_object_"
            namePrefix="UniFi Network Object "
            confirm
            tall
          />
          <NetworkSwitchList
            title="Rules"
            icon={mdiShieldOutline}
            color="orange"
            entityPrefix="switch.unifi_network_"
            excludeEntityPrefixes={["switch.unifi_network_port_forwarding_", "switch.unifi_network_object_"]}
            namePrefix="UniFi Network "
            confirm
            tall
          />
          <SegmentHeader icon={mdiCog} title="Controls" iconColor="red"/>
          <Grid columns={2} gap="xs">
            <ActionCard
              title="Gateway"
              description="Restart"
              icon={mdiRestart}
              entity="button.cloud_gateway_fiber_restart"
              confirm
            />
            <ActionCard
              title="Switch"
              description="Restart"
              icon={mdiRestart}
              entity="button.usw_flex_2_5g_5_restart"
              confirm
            />
            <ActionCard
              title="Access Point"
              description="Restart"
              icon={mdiRestart}
              entity="button.u7_pro_restart"
              confirm
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
