import {PointerEvent, useRef} from "react";
import clsx from "clsx";
import {waveformLevels} from "../../helpers/waveform-levels";
import styles from "./waveform.module.scss";

type Props = {
  seed: string,
  count: number,
  value: number,
  max: number,
  colored?: boolean,
  disabled?: boolean,
  onValueChange: (value: number) => void,
  onValueCommit: (value: number) => void,
}

export default function Waveform(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const levels = waveformLevels(props.seed, props.count);
  const progress = props.max > 0 ? props.value / props.max : 0;

  const toValue = (event: PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)) * props.max;
  }

  return (
    <div
      ref={ref}
      className={clsx(styles["base"], props.colored && styles["colored"], props.disabled && styles["disabled"])}
      onPointerDown={(event) => {
        if (props.disabled)
          return;

        event.currentTarget.setPointerCapture(event.pointerId);
        props.onValueChange(toValue(event));
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          props.onValueChange(toValue(event));
      }}
      onPointerUp={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId))
          return;

        event.currentTarget.releasePointerCapture(event.pointerId);
        props.onValueCommit(toValue(event));
      }}
    >
      {levels.map((level, index) => (
        <div
          key={index}
          className={clsx(styles["bar"], (index + 0.5) / props.count <= progress && styles["played"])}
          style={{height: `${Math.round(level * 100)}%`}}
        />
      ))}
    </div>
  )
}
