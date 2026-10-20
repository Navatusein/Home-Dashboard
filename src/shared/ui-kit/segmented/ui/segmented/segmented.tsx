"use client"

import {ComponentProps, useId} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {motion} from "framer-motion";
import styles from "./segmented.module.scss";
import {COLORS, ColorToken} from "@/shared/constants/colors";
import {SegmentedOption} from "../../types/types";

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
      }
    },
    defaultVariants: {},
  }
)

type Props<T extends string | number> = Omit<ComponentProps<"div">, "onChange" | "color"> & VariantProps<typeof variants> & {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function Segmented<T extends string | number>(props: Props<T>) {
  const {className, color, options, value, onChange, ...otherProps} = props;

  const indicatorId = useId();

  return (
    <div
      data-slot="segmented"
      className={variants({
        className: className,
        color: color
      })}
      {...otherProps}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-selected={option.value == value}
          className={styles["option"]}
          onClick={() => onChange(option.value)}
        >
          {option.value == value && (
            <motion.span
              layoutId={indicatorId}
              className={styles["indicator"]}
              transition={{type: "spring", bounce: 0.2, duration: 0.4}}
            />
          )}
          <span className={styles["text"]}>
            {option.text}
          </span>
        </button>
      ))}
    </div>
  )
}
