import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiCloudOutline, mdiGoogle, mdiLan, mdiMicrosoft, mdiRouterNetwork, mdiRouterNetworkWireless, mdiWifi} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {usePathname, useRouter} from "next/navigation";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";

type Props = {
  modal?: string;
}

export default function NetworkSegment(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const gatewayState = useEntity("sensor.cloud_gateway_fiber_state");

  const isConnected = gatewayState.state == "connected";

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiLan} title="Network" iconColor="teal"/>
      <Grid columns={2} gap="xs">
        <EntityStateCard
          title="Cloudflare"
          icon={mdiCloudOutline}
          entity="sensor.cloud_gateway_fiber_cloudflare_wan_latency"
        />
        <Grid.Element rowSpan={2}>
          <StateCard
            tall
            title="Gateway"
            text={isConnected ? "Connected" : "Disconnected"}
            icon={isConnected ? mdiRouterNetworkWireless : mdiRouterNetwork}
            color={isConnected ? "teal" : undefined}
            onClick={props.modal ? () => router.push(`${pathname}?modal=${props.modal}`) : undefined}
          />
        </Grid.Element>
        <EntityStateCard
          title="Google"
          icon={mdiGoogle}
          entity="sensor.cloud_gateway_fiber_google_wan_latency"
        />
        <EntityStateCard
          title="Microsoft"
          icon={mdiMicrosoft}
          entity="sensor.cloud_gateway_fiber_microsoft_wan_latency"
        />
        <EntityStateCard
          title="Wi-Fi Clients"
          icon={mdiWifi}
          entity="sensor.masyasys_clients"
        />
      </Grid>
    </Flex>
  )
}
