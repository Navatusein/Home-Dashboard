import {Grid} from "@/shared/ui-kit";
import {CommunicationButton} from "@/widgets/terminal-buttons/communication-button";
import MicrophoneOff from "@public/icons/media/microphone-off.svg";
import Microphone2Icon from "@public/icons/media/microphone-2.svg";
import DeviceComputerCameraIcon from "@public/icons/streaming-and-socials/device-computer-camera.svg";
import DeviceComputerCameraOffIcon from "@public/icons/streaming-and-socials/device-computer-camera-off.svg";
import HeadphonesOffIcon from "@public/icons/media/headphones-off.svg";
import HeadphonesIcon from "@public/icons/media/headphones.svg";

export default function CommunicationControlSection() {
  return (
    <>
      <Grid.Section rowStart={2} colStart={11} direction="horizontal">
        <CommunicationButton
          title="Teams"
          switchEntity="switch.navatusein_pc_teams_mute"
          isMeetingBinarySensor="binary_sensor.navatusein_pc_teams_meeting"
          isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_teams_plugin_status"
          disabledIcon={Microphone2Icon}
          iconOn={MicrophoneOff}
          iconOff={Microphone2Icon}
          colorOn="blue"
          colorOff="default"
        />
        <CommunicationButton
          title="Discord"
          switchEntity="switch.navatusein_pc_discord_mute"
          isMeetingBinarySensor="binary_sensor.navatusein_pc_discord_voice_channel"
          isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_discord_plugin_status"
          disabledIcon={Microphone2Icon}
          iconOn={MicrophoneOff}
          iconOff={Microphone2Icon}
          colorOn="blue"
          colorOff="default"
        />
      </Grid.Section>
      <Grid.Section rowStart={3} colStart={11} direction="horizontal">
        <CommunicationButton
          title="Teams"
          switchEntity="switch.navatusein_pc_teams_camera"
          isMeetingBinarySensor="binary_sensor.navatusein_pc_teams_meeting"
          isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_teams_plugin_status"
          disabledIcon={DeviceComputerCameraIcon}
          iconOn={DeviceComputerCameraIcon}
          iconOff={DeviceComputerCameraOffIcon}
          colorOn="blue"
          colorOff="default"
        />
        <CommunicationButton
          title="Discord"
          switchEntity="switch.navatusein_pc_discord_deafen"
          isMeetingBinarySensor="binary_sensor.navatusein_pc_discord_voice_channel"
          isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_discord_plugin_status"
          disabledIcon={HeadphonesIcon}
          iconOn={HeadphonesOffIcon}
          iconOff={HeadphonesIcon}
          colorOn="blue"
          colorOff="default"
        />
      </Grid.Section>
    </>
  )
}
