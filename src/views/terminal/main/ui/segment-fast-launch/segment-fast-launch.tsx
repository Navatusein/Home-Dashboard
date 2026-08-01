import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";

export default function SegmentFastLaunch() {
  return (
    <>
      <Grid.Section rowStart={3}>
        <ButtonButton entity="button.navatusein_pc_launch_telegram" image="/applications/Telegram.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_discord" image="/applications/Discord.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_steam" image="/applications/Steam.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_virtual_desktop" image="/applications/Vitrual Desktop.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_spotify" image="/applications/Spotify.png"/>
      </Grid.Section>
      <Grid.Section rowStart={4}>
        <ButtonButton entity="button.navatusein_pc_launch_chrome" image="/applications/Chrome.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_visual_studio_code" image="/applications/VS Code.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_webstorm" image="/applications/WebStorm.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_microsoft_teams" image="/applications/Microsot Teams.png"/>
        <ButtonButton entity="button.navatusein_pc_launch_rdp" image="/applications/RDP.png"/>
      </Grid.Section>
    </>
  )
}
