"use client"

import {BootstrapGrid, Flex, ResponsiveToggler} from "@/shared/ui-kit";
import {useUser} from "@hakit/core";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import StatusSegment from "../../segments/status-segment/status-segment";
import NodeSegment from "../../segments/node-segment/node-segment";
import NetworkSegment from "../../segments/network-segment/network-segment";
import NodeModal from "../../modals/node-modal/node-modal";
import NetworkModal from "../../modals/network-modal/network-modal";
import AdminSegment from "../../segments/admin-segment/admin-segment";
import BatteriesModal from "../../modals/batteries-modal/batteries-modal";
import UpdatesModal from "../../modals/updates-modal/updates-modal";

export default function ServerView() {
  const canOpenModals = useUser()?.name == "Bohdan";

  return (
    <Flex vertical gap="sm">
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={24}>
          <Flex vertical gap="sm">
            <ResponsiveToggler breakpoint="sm" hide>
              <InfoCard/>
            </ResponsiveToggler>
            <StatusSegment/>
          </Flex>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <NodeSegment
            title="Vega"
            color="blue"
            modal={canOpenModals ? "vega" : undefined}
            statusBinarySensor="binary_sensor.node_vega_status"
            cpuSensor="sensor.node_vega_cpu_used"
            memorySensor="sensor.node_vega_memory_used_percentage"
            memoryFreeSensor="sensor.node_vega_memory_free"
            diskSensor="sensor.node_vega_disk_used_percentage"
          />
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <NodeSegment
            title="Sirius"
            color="purple"
            modal={canOpenModals ? "sirius" : undefined}
            statusBinarySensor="binary_sensor.node_sirius_status"
            cpuSensor="sensor.node_sirius_cpu_used"
            memorySensor="sensor.node_sirius_memory_used_percentage"
            memoryFreeSensor="sensor.node_sirius_memory_free"
            diskSensor="sensor.node_sirius_disk_used_percentage"
          />
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <NodeSegment
            title="Orion"
            color="orange"
            modal={canOpenModals ? "orion" : undefined}
            statusBinarySensor="binary_sensor.node_orion_status"
            cpuSensor="sensor.node_orion_cpu_used"
            memorySensor="sensor.node_orion_memory_used_percentage"
            memoryFreeSensor="sensor.node_orion_memory_free"
            diskSensor="sensor.node_orion_disk_used_percentage"
          />
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <NetworkSegment modal={canOpenModals ? "network" : undefined}/>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} lg={12} md={24}>
          <AdminSegment canOpenModals={canOpenModals}/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      {canOpenModals && (
        <>
          <NodeModal
            title="Vega"
            node="vega"
            color="blue"
          />
          <NodeModal
            title="Sirius"
            node="sirius"
            color="purple"
          />
          <NodeModal
            title="Orion"
            node="orion"
            color="orange"
          />
          <NetworkModal/>
          <BatteriesModal/>
          <UpdatesModal/>
        </>
      )}
    </Flex>
  )
}
