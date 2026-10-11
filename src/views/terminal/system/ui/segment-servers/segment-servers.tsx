import ServerControls from "../server-controls/server-controls";

export default function SegmentServers() {
  return (
    <>
      <ServerControls
        title="Vega"
        colStart={8}
        socketSwitch="switch.vega_nas_wr01b"
        statusBinarySensor="binary_sensor.node_vega_status"
        powerSensor="sensor.vega_nas_wr01b_power"
        shutdownButton="button.node_vega_shutdown"
        wakeButton="button.node_vega_wake_on_lan"
      />
      <ServerControls
        title="Sirius"
        colStart={9}
        socketSwitch="switch.sirius_nas_wr01b"
        statusBinarySensor="binary_sensor.node_sirius_status"
        powerSensor="sensor.sirius_nas_wr01b_power"
        shutdownButton="button.node_sirius_shutdown"
        wakeButton="button.node_sirius_wake_on_lan"
      />
      <ServerControls
        title="Orion"
        colStart={10}
        socketSwitch="switch.orion_nas_wr01b"
        statusBinarySensor="binary_sensor.node_orion_status"
        powerSensor="sensor.orion_nas_wr01b_power"
        shutdownButton="button.node_orion_shutdown"
        wakeButton="button.node_orion_wake_on_lan"
      />
    </>
  )
}
