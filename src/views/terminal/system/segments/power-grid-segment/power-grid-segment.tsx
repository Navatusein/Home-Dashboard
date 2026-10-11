"use client"

import {Grid} from "@/shared/ui-kit";
import {useEntity} from "@hakit/core";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {ChargedButton} from "@/widgets/terminal-buttons/charged-button";
import {SensorButton} from "@/widgets/terminal-buttons/sensor-button";
import PlugConnectedIcon from "@public/icons/home-automation-and-buildings/plug-connected.svg";
import PlugConnectedXIcon from "@public/icons/home-automation-and-buildings/plug-connected-x.svg";
import BoltIcon from "@public/icons/weather/bolt.svg";

export default function PowerGridSegment() {
  const inputSource = useEntity("sensor.gx_device_ac_active_input_source");

  const isGrid = inputSource.state == "grid";

  return (
    <Grid.Section rowStart={2} colStart={8} direction="horizontal">
      <BaseButton
        title="Grid"
        icon={isGrid ? PlugConnectedIcon : PlugConnectedXIcon}
        color={isGrid ? "blue" : "red"}
      />
      <ChargedButton
        title="Victron"
        chargeSensor="sensor.pylontech_battery_id_512_charge"
        chargingStateSensor="sensor.gx_device_dc_battery_state"
        chargingStateValue="charging"
      />
      <SensorButton
        entity={
          isGrid ?
          "sensor.multiplus_ii_48_4k5_55_32_id_276_0_line_1_input_power" :
          "sensor.pylontech_battery_id_512_power"
        }
        icon={BoltIcon}
        textTransformer={(text) => Math.abs(Math.round(Number(text))).toString()}
      />
    </Grid.Section>
  )
}
