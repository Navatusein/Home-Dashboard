import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiApps,
  mdiChartLine,
  mdiGoogleChrome,
  mdiHeadset,
  mdiLanguageJavascript,
  mdiMicrosoftTeams,
  mdiMicrosoftVisualStudioCode,
  mdiRemoteDesktop,
  mdiSend,
  mdiSpotify,
  mdiSteam
} from "@mdi/js";
import {ActionCard} from "@/widgets/home-assistant-cards/action-card";

export default function AppsSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiApps} title="Apps" iconColor="purple"/>
      <Grid columns={2} gap="xs">
        <ActionCard
          title="Telegram"
          description="Launch"
          icon={mdiSend}
          entity="button.navatusein_pc_launch_telegram"
        />
        <ActionCard
          title="Discord"
          description="Launch"
          icon={mdiHeadset}
          entity="button.navatusein_pc_launch_discord"
        />
        <ActionCard
          title="Steam"
          description="Launch"
          icon={mdiSteam}
          entity="button.navatusein_pc_launch_steam"
        />
        <ActionCard
          title="Spotify"
          description="Launch"
          icon={mdiSpotify}
          entity="button.navatusein_pc_launch_spotify"
        />
        <ActionCard
          title="Chrome"
          description="Launch"
          icon={mdiGoogleChrome}
          entity="button.navatusein_pc_launch_chrome"
        />
        <ActionCard
          title="VS Code"
          description="Launch"
          icon={mdiMicrosoftVisualStudioCode}
          entity="button.navatusein_pc_launch_visual_studio_code"
        />
        <ActionCard
          title="WebStorm"
          description="Launch"
          icon={mdiLanguageJavascript}
          entity="button.navatusein_pc_launch_webstorm"
        />
        <ActionCard
          title="Teams"
          description="Launch"
          icon={mdiMicrosoftTeams}
          entity="button.navatusein_pc_launch_microsoft_teams"
        />
        <ActionCard
          title="RDP"
          description="Launch"
          icon={mdiRemoteDesktop}
          entity="button.navatusein_pc_launch_rdp"
        />
        <ActionCard
          title="Task Manager"
          description="Launch"
          icon={mdiChartLine}
          entity="button.navatusein_pc_launch_task_manager"
        />
      </Grid>
    </Flex>
  )
}
