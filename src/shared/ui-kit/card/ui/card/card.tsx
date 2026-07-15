"use client"

import {ComponentProps, CSSProperties} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./card.module.scss";
import {COLORS, ColorToken} from "@/shared/constants/colors";
import {PADDINGS, PaddingToken} from "@/shared/constants/paddings";

const colorVariants = Object.fromEntries(
  COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<ColorToken, string>;

const paddingVariants = Object.fromEntries(
  PADDINGS.map(value => [value, styles[`padding-${value}`]])
) as Record<PaddingToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...colorVariants
      },
      padding: {
        0: styles["padding-0"],
        ...paddingVariants
      },
      clickable: {
        true: styles["clickable"],
        false: null
      },
      outline: {
        true: styles["outline"],
        false: null
      }
    },
    defaultVariants: {
      padding: "md",
    },
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  stackCount?: number;
}

export default function Card(props: Props) {
  const {className, asChild = false, color, padding, clickable, outline, stackCount, style, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="card"
      data-clickable={clickable}
      data-color-scheme={(color == "default" || color == null) ? "light" : "dark"}
      style={{
        ...(style as CSSProperties),
        ["--card-stack-count" as never]: stackCount,
      }}
      className={variants({
        className: className,
        color: color,
        padding: padding,
        clickable: clickable,
        outline: outline
      })}
      {...otherProps}
    />
  )
}