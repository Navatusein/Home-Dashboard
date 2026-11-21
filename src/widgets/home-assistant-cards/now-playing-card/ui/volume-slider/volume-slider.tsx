import clsx from "clsx";
import {Icon, Slider, Typography} from "@/shared/ui-kit";
import {mdiVolumeHigh} from "@mdi/js";
import styles from "./volume-slider.module.scss";

type Props = {
  value: number,
  vertical?: boolean,
  colored?: boolean,
  disabled?: boolean,
  className?: string,
  onValueChange: (value: number) => void,
  onValueCommit: (value: number) => void,
}

export default function VolumeSlider(props: Props) {
  return (
    <div className={clsx(styles["base"], props.vertical && styles["vertical"], props.colored && styles["colored"], props.className)}>
      <Slider
        vertical={props.vertical}
        color="purple"
        tone={props.colored ? "darker" : undefined}
        className={styles["slider"]}
        min={0}
        max={100}
        value={[props.value]}
        disabled={props.disabled}
        onValueChange={(value) => props.onValueChange(value[0])}
        onValueCommit={(value) => props.onValueCommit(value[0])}
      />
      <Icon path={mdiVolumeHigh} size="sm" className={styles["icon"]}/>
      <Typography.Text fontSize="xs" textColor="secondary" className={styles["value"]}>
        {props.value}%
      </Typography.Text>
    </div>
  )
}
