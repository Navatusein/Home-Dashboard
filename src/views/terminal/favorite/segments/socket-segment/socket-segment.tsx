"use client"

import {Grid} from "@/shared/ui-kit";
import {ToggleButton} from "@/widgets/terminal-buttons/toggle-button";
import DeviceLaptopIcon from "@public/icons/devices-and-networks/device-laptop.svg";
import DeviceLaptopOffIcon from "@public/icons/devices-and-networks/device-laptop-off.svg";
import DevicesPcIcon from "@public/icons/devices-and-networks/devices-pc.svg";
import DevicesPcOffIcon from "@public/icons/devices-and-networks/devices-pc-off.svg";
import DeviceDesktopIcon from "@public/icons/devices-and-networks/device-desktop.svg";
import DeviceDesktopOffIcon from "@public/icons/devices-and-networks/device-desktop-off.svg";

export default function SocketSegment() {
  return (
    <Grid.Section rowStart={7} colStart={10} direction="horizontal">
      <ToggleButton
        entity="switch.laptop_nas_wr01b"
        iconEnabled={DeviceLaptopIcon}
        iconDisabled={DeviceLaptopOffIcon}
        colorEnabled="blue"
        title="Power"
      />
      <ToggleButton
        entity="switch.pc_nas_wr01b"
        iconEnabled={DevicesPcIcon}
        iconDisabled={DevicesPcOffIcon}
        colorEnabled="blue"
        title="PC"
      />
      <ToggleButton
        entity="switch.0xa4c138dd3f063ee4"
        iconEnabled={DeviceDesktopIcon}
        iconDisabled={DeviceDesktopOffIcon}
        colorEnabled="blue"
        title="Monitor"
      />
    </Grid.Section>
  )
}
