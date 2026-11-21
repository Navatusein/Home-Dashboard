import {mdiCellphone} from "@mdi/js";
import {StatusCardLayout} from "@/widgets/home-assistant-cards/status-card";
import {usePhonePlayer} from "@/shared/hooks/use-phone-player";

type Props = {
  selected?: boolean,
  onClick?: () => void,
}

export default function PhoneStatusCard(props: Props) {
  const state = usePhonePlayer();

  return (
    <StatusCardLayout
      title="Phone"
      text={state?.playing ? "Playing" : state?.active ? "Paused" : "Idle"}
      icon={mdiCellphone}
      iconColor={props.selected ? "purple" : "secondary"}
      onClick={props.onClick}
    />
  )
}
