"use client"

import {Grid} from "@/shared/ui-kit";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import DeviceLaptopIcon from "@public/icons/devices-and-networks/device-laptop.svg";
import DeviceLaptopOffIcon from "@public/icons/devices-and-networks/device-laptop-off.svg";
import DevicesPcIcon from "@public/icons/devices-and-networks/devices-pc.svg";
import DevicesPcOffIcon from "@public/icons/devices-and-networks/devices-pc-off.svg";
import DeviceDesktopIcon from "@public/icons/devices-and-networks/device-desktop.svg";
import DeviceDesktopOffIcon from "@public/icons/devices-and-networks/device-desktop-off.svg";
import PlugIcon from "@public/icons/home-automation-and-buildings/plug.svg";
import PlugOffIcon from "@public/icons/home-automation-and-buildings/plug-off.svg";

export default function SocketSegment() {
  return (
    <>
      <Grid.Section rowStart={6} colStart={10} direction="horizontal">
        <ToggleButton
          entity="switch.laptop_nas_wr01b"
          iconEnabled={DeviceLaptopIcon}
          iconDisabled={DeviceLaptopOffIcon}
          colorEnabled="blue"
          title="Laptop"
        />
        <ToggleButton
          entity="switch.pc_group_nas_wr01b"
          iconEnabled={PlugIcon}
          iconDisabled={PlugOffIcon}
          colorEnabled="blue"
          title="Group"
        />
        <ToggleButton
          entity="switch.pc_nas_wr01b"
          iconEnabled={DevicesPcIcon}
          iconDisabled={DevicesPcOffIcon}
          colorEnabled="blue"
          title="PC"
        />
      </Grid.Section>

      <Grid.Section rowStart={7} colStart={10} direction="horizontal">
        <ToggleButton
          entity="switch.monitor_left_nas_wr01b"
          iconEnabled={DeviceDesktopIcon}
          iconDisabled={DeviceDesktopOffIcon}
          colorEnabled="blue"
          title="Left"
        />
        <ToggleButton
          entity="switch.monitor_sentral_nas_wr01b"
          iconEnabled={DeviceDesktopIcon}
          iconDisabled={DeviceDesktopOffIcon}
          colorEnabled="blue"
          title="Central"
        />
        <ToggleButton
          entity="switch.monitor_right_nas_wr01b"
          iconEnabled={DeviceDesktopIcon}
          iconDisabled={DeviceDesktopOffIcon}
          colorEnabled="blue"
          title="Right"
        />
      </Grid.Section>
    </>
  )
}
