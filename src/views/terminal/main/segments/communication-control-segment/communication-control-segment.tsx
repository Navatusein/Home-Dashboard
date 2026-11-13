import {Grid} from "@/shared/ui-kit";
import {CommunicationButton} from "@/widgets/terminal-buttons/communication-button";
import MicrophoneOff from "@public/icons/media/microphone-off.svg";
import Microphone2Icon from "@public/icons/media/microphone-2.svg";
// import DeviceComputerCameraIcon from "@public/icons/streaming-and-socials/device-computer-camera.svg";
// import DeviceComputerCameraOffIcon from "@public/icons/streaming-and-socials/device-computer-camera-off.svg";
import HeadphonesOffIcon from "@public/icons/media/headphones-off.svg";
import HeadphonesIcon from "@public/icons/media/headphones.svg";
import {useDiscordDevice} from "@/shared/hooks/use-discord-device";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

export default function CommunicationControlSegment() {
  const {device} = useDiscordDevice();

  return (
    <>
      {/*<Grid.Section rowStart={2} colStart={11} direction="vertical">*/}
      {/*  <CommunicationButton*/}
      {/*    title="Teams"*/}
      {/*    switchEntity="switch.navatusein_pc_teams_mute"*/}
      {/*    isMeetingBinarySensor="binary_sensor.navatusein_pc_teams_meeting"*/}
      {/*    isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_teams_plugin_status"*/}
      {/*    disabledIcon={Microphone2Icon}*/}
      {/*    iconOn={MicrophoneOff}*/}
      {/*    iconOff={Microphone2Icon}*/}
      {/*    colorOn="blue"*/}
      {/*    colorOff="default"*/}
      {/*  />*/}
      {/*  <CommunicationButton*/}
      {/*    title="Teams"*/}
      {/*    switchEntity="switch.navatusein_pc_teams_camera"*/}
      {/*    isMeetingBinarySensor="binary_sensor.navatusein_pc_teams_meeting"*/}
      {/*    isApplicationActiveBinarySensor="binary_sensor.navatusein_pc_teams_plugin_status"*/}
      {/*    disabledIcon={DeviceComputerCameraIcon}*/}
      {/*    iconOn={DeviceComputerCameraIcon}*/}
      {/*    iconOff={DeviceComputerCameraOffIcon}*/}
      {/*    colorOn="blue"*/}
      {/*    colorOff="default"*/}
      {/*  />*/}
      {/*</Grid.Section>*/}
      <AgentDisabledProvider entity={device.agentRunning}>
        <Grid.Section rowStart={2} colStart={12} direction="vertical">
          <CommunicationButton
            title="Discord"
            switchEntity={device.discordMute}
            isMeetingBinarySensor={device.discordVoiceChannel}
            isApplicationActiveBinarySensor={device.discordPluginStatus}
            disabledIcon={Microphone2Icon}
            iconOn={MicrophoneOff}
            iconOff={Microphone2Icon}
            colorOn="blue"
            colorOff="default"
          />
          <CommunicationButton
            title="Discord"
            switchEntity={device.discordDeafen}
            isMeetingBinarySensor={device.discordVoiceChannel}
            isApplicationActiveBinarySensor={device.discordPluginStatus}
            disabledIcon={HeadphonesIcon}
            iconOn={HeadphonesOffIcon}
            iconOff={HeadphonesIcon}
            colorOn="blue"
            colorOff="default"
          />
        </Grid.Section>
      </AgentDisabledProvider>
    </>
  )
}
