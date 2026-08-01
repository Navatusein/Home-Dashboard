import {Grid} from "@/shared/ui-kit";
import {ButtonButton} from "@/widgets/terminal-buttons/button-button";
import CameraIcon from "@public/icons/software-editors-and-uI/camera.svg";
import MovieActionBoardIcon from "@public/icons/streaming-and-socials/movie-action-board.svg";

export default function SegmentMomentAction() {
  return (
    <>
      <Grid.Section rowStart={6} colStart={5} direction="horizontal">
        <ButtonButton entity="button.navatusein_pc_launch_sharex_screenshoot" title="Screen" icon={CameraIcon}/>
      </Grid.Section>
      <Grid.Section rowStart={7} colStart={5} direction="horizontal">
        <ButtonButton entity="button.navatusein_pc_launch_sharex_screenshoot_last_area" title="Last area" icon={CameraIcon}/>
        <ButtonButton entity="button.navatusein_pc_hotkey_save_moment" title="Moment" icon={MovieActionBoardIcon}/>
      </Grid.Section>
    </>
  )
}
