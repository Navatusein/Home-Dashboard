"use client"

import {ComponentProps, useRef} from "react";
import {Root, Track, Range, Thumb} from "@radix-ui/react-slider";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./slider.module.scss";
import {ALL_COLORS, AllColorToken} from "@/shared/constants/colors";

const colorVariants = Object.fromEntries(
  ALL_COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<AllColorToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...colorVariants
      },
      vertical: {
        true: styles["vertical"],
        false: null
      },
      thumb: {
        true: styles["with-thumb"],
        false: null
      },
      tone: {
        darker: styles["tone-darker"],
        lighter: styles["tone-lighter"]
      }
    },
    defaultVariants: {},
  }
)

const TOUCH_SLOP = 8;

type Props = Omit<ComponentProps<typeof Root>, "color"> & VariantProps<typeof variants> & {
}

export default function Slider(props: Props) {
  const {className, defaultValue, value, color, vertical, thumb, tone, max, min, onValueChange, ...otherProps} = props;

  const touchStartRef = useRef<{x: number, y: number}>(null);

  const resetTouch = () => {
    touchStartRef.current = null;
  }

  return (
    <Root
      data-slot="slider"
      defaultValue={defaultValue}
      orientation={vertical ? "vertical" : "horizontal"}
      value={value}
      min={min}
      max={max}
      onValueChange={(value) => {
        if (!touchStartRef.current)
          onValueChange?.(value);
      }}
      onPointerDown={(event) => {
        touchStartRef.current = event.pointerType == "touch" ? {x: event.clientX, y: event.clientY} : null;
      }}
      onPointerMove={(event) => {
        if (!touchStartRef.current)
          return;

        const deltaX = Math.abs(event.clientX - touchStartRef.current.x);
        const deltaY = Math.abs(event.clientY - touchStartRef.current.y);
        const [along, across] = vertical ? [deltaY, deltaX] : [deltaX, deltaY];

        if (along > TOUCH_SLOP && along > across)
          touchStartRef.current = null;
      }}
      onPointerUp={resetTouch}
      onPointerCancel={resetTouch}
      className={variants({
        className: className,
        color: color,
        vertical: vertical,
        thumb: thumb,
        tone: tone
      })}
      {...otherProps}
    >
      <Track data-slot="slider-track" className={styles["track"]}>
        <Range data-slot="slider-range" className={styles["range"]}/>
      </Track>
      <Thumb/>
    </Root>
  )
}