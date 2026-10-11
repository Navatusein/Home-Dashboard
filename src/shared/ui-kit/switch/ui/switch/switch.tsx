"use client"

import {ComponentProps} from "react";
import {Root, Thumb} from "@radix-ui/react-switch";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./switch.module.scss";
import {COLORS, ColorToken} from "@/shared/constants/colors";

const colorVariants = Object.fromEntries(
  COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<ColorToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...colorVariants
      },
      tone: {
        darker: styles["tone-darker"],
        lighter: styles["tone-lighter"]
      }
    },
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<typeof Root>, "color"> & VariantProps<typeof variants> & {
}

export default function Switch(props: Props) {
  const {className, color, tone, ...otherProps} = props;

  return (
    <Root
      data-slot="switch"
      className={variants({
        className: className,
        color: color,
        tone: tone
      })}
      {...otherProps}
    >
      <Thumb data-slot="switch-thumb" className={styles["thumb"]}/>
    </Root>
  )
}
