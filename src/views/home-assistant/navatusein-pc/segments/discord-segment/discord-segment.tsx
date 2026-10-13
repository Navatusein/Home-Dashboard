import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiAccountVoice, mdiHeadphonesOff, mdiHeadset, mdiMicrophoneOff, mdiPhoneHangup} from "@mdi/js";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";
import {useEntityOff} from "@/shared/hooks/use-entity-off";

export default function DiscordSegment() {
  const isRunning = !useEntityOff("binary_sensor.navatusein_pc_discord_plugin_status");
  const isInVoice = !useEntityOff("binary_sensor.navatusein_pc_discord_voice_channel") && isRunning;

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiHeadset} title="Discord" iconColor="blue"/>
      <Grid columns={2} gap="xs">
        <Grid.Element rowSpan={2}>
          <StateCard
            tall
            title="Voice"
            text={isInVoice ? "In Channel" : (isRunning ? "Idle" : "Offline")}
            icon={mdiAccountVoice}
            color={isInVoice ? "blue" : undefined}
          />
        </Grid.Element>
        <SwitchCard
          title="Mute"
          icon={mdiMicrophoneOff}
          entity="switch.navatusein_pc_discord_mute"
          color="red"
        />
        <SwitchCard
          title="Deafen"
          icon={mdiHeadphonesOff}
          entity="switch.navatusein_pc_discord_deafen"
          color="red"
        />
        {isInVoice && (
          <Grid.Element colSpan={2}>
            <ActionCard
              title="Leave"
              description="Leave channel"
              icon={mdiPhoneHangup}
              entity="button.navatusein_pc_discord_leave_channel"
              color="red"
            />
          </Grid.Element>
        )}
      </Grid>
    </Flex>
  )
}
