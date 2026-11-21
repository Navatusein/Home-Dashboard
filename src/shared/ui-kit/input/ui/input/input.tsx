import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {mdiClose} from "@mdi/js";
import {Icon} from "@/shared/ui-kit/icon";
import styles from "./input.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {
      shape: {
        default: null,
        round: styles["shape-round"],
      },
    },
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<"input">, "size"> & VariantProps<typeof variants> & {
  icon?: string;
  onClear?: () => void;
}

export default function Input(props: Props) {
  const {className, style, shape, icon, onClear, ...otherProps} = props;

  return (
    <div
      data-slot="input"
      style={style}
      className={variants({
        className: className,
        shape: shape,
      })}
    >
      {icon && (
        <Icon path={icon} color="secondary" className={styles["icon"]}/>
      )}
      <input className={styles["input"]} {...otherProps}/>
      {onClear && !!props.value && (
        <button type="button" aria-label="Clear" className={styles["clear"]} onClick={onClear}>
          <Icon path={mdiClose} size="sm" color="secondary"/>
        </button>
      )}
    </div>
  )
}
