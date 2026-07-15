import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./space-separator.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {
      vertical: {
        true: styles["vertical"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<"div">, "children"> & VariantProps<typeof variants> & {

}

export default function SpaceSeparator(props: Props) {
  const {className, vertical, ...otherProps} = props;

  return (
    <div
      data-slot="space-separator"
      className={variants({
        className: className,
        vertical: vertical,
      })}
      {...otherProps}
    >

    </div>
  )
}