"use client"

import {ComponentProps, useEffect, useState} from "react";
import {Root, Track, Range, Thumb} from "@radix-ui/react-slider";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./slider.module.scss";

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

type Props = ComponentProps<typeof Root> & VariantProps<typeof variants> & {
}

export default function Slider(props: Props) {
  const {className, defaultValue, value, vertical, max, min, ...otherProps} = props;
  return (
    <Root
      data-slot="slider"
      defaultValue={defaultValue}
      orientation={vertical ? "vertical" : "horizontal"}
      value={value}
      min={min}
      max={max}
      className={variants({
        className: className,
        vertical: vertical
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