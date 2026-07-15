import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./row.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {
      verticalGutter: {
        xl: styles["vertical-gutter-xl"],
        lg: styles["vertical-gutter-lg"],
        md: styles["vertical-gutter-md"],
        sm: styles["vertical-gutter-sm"],
        xs: styles["vertical-gutter-xs"],
      },
      horizontalGutter: {
        xl: styles["horizontal-gutter-xl"],
        lg: styles["horizontal-gutter-lg"],
        md: styles["horizontal-gutter-md"],
        sm: styles["horizontal-gutter-sm"],
        xs: styles["horizontal-gutter-xs"],
      },
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
}

export default function Row(props: Props) {
  const {className, asChild = false, verticalGutter, horizontalGutter, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="bootstrap-row"
      className={variants({
        className: className,
        verticalGutter: verticalGutter,
        horizontalGutter: horizontalGutter,
      })}
      {...otherProps}
    />
  )
}