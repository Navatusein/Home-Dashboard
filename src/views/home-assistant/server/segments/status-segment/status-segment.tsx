import {Flex, ResponsiveToggler} from "@/shared/ui-kit";
import {StatusCard} from "@/widgets/home-assistant-cards/status-card";
import {mdiDownload, mdiServerNetwork, mdiSpeedometer, mdiUpload} from "@mdi/js";
import {numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";

export default function StatusSegment() {
  return (
    <ResponsiveToggler breakpoint="sm" hide>
      <Flex justify="space-around">
        <StatusCard
          icon={mdiServerNetwork}
          iconColor="green"
          title="Nodes"
          entity="sensor.proxmox_cluster_nodes_online"
        />
        <StatusCard
          icon={mdiDownload}
          iconColor="blue"
          title="Download"
          entity="sensor.cloud_gateway_fiber_port_5_rx"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <StatusCard
          icon={mdiUpload}
          iconColor="red"
          title="Upload"
          entity="sensor.cloud_gateway_fiber_port_5_tx"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <StatusCard
          icon={mdiSpeedometer}
          iconColor="purple"
          title="Ping"
          entity="sensor.cloud_gateway_fiber_cloudflare_wan_latency"
        />
      </Flex>
    </ResponsiveToggler>
  )
}
