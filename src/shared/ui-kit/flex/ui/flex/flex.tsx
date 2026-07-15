import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./flex.module.scss";
import {GAPS, GapToken} from "@/shared/constants/gaps";

const gapsVariants = Object.fromEntries(
  GAPS.map(value => [value, styles[`gap-${value}`]])
) as Record<GapToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      gap: {
        ...gapsVariants
      },
      align: {
        start: styles["align-start"],
        end: styles["align-end"],
        center: styles["align-center"],
      },
      justify: {
        start: styles["justify-start"],
        end: styles["justify-end"],
        center: styles["justify-center"],
        ["space-between"]: styles["justify-space-between"],
        ["space-around"]: styles["justify-space-around"]
      },
      wrap: {
        true: styles["wrap"],
        false: null
      },
      vertical: {
        true: styles["vertical"],
        false: null
      },
      grow: {
        true: styles["grow"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {

}

export default function Flex(props: Props) {
  const {className, gap, align, justify, wrap, vertical, grow, ...otherProps} = props;

  return (
    <div
      data-slot="flex"
      className={variants({
        className: className,
        gap: gap,
        align: align,
        justify: justify,
        wrap: wrap,
        vertical: vertical,
        grow: grow
      })}
      {...otherProps}
    />
  )
}