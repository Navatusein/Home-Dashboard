import {Chips} from "@/shared/ui-kit/chips";
import {mdiCircle, mdiCircleOutline} from "@mdi/js";
import useGestures from "@/shared/hooks/use-gestures";
import {HistoryChartSeries} from "../../types/types";

type Props = {
  series: HistoryChartSeries,
  hidden: boolean,
  onToggle: () => void,
  onSolo: () => void,
}

export default function HistoryChartChip(props: Props) {
  const gestures = useGestures({
    onClickAction: props.onToggle,
    onLongPressAction: props.onSolo,
  });

  return (
    <Chips
      text={props.series.name}
      icon={props.hidden ? mdiCircleOutline : mdiCircle}
      iconColor={props.series.color}
      clickable
      {...gestures}
    />
  )
}
