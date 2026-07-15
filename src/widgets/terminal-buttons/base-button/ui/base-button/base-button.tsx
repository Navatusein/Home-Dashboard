"use client"

import {Flex, Grid, Typography} from "@/shared/ui-kit"
import styles from "./base-button.module.scss"
import {ComponentProps, FC, SVGProps, useContext} from "react";
import {cva, VariantProps} from "class-variance-authority";
import useGestures from "@/shared/hooks/use-gestures";
import Image from "next/image";
import {BaseButtonSharedProps} from "../../types/type";
import {DisabledContext} from "@/shared/contexts/disabled-context";

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        green: styles["color-green"],
        blue: styles["color-blue"],
        red: styles["color-red"],
      },
      textWrap: {
        true: styles["text-wrap"],
        false: null
      },
      disabled: {
        true: styles["disabled"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

export type Props = BaseButtonSharedProps & ComponentProps<"div"> & VariantProps<typeof variants> & {
  title?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  image?: string;
  onClickAction?: () => void;
  onDoubleClickAction?: () => void;
  onLongPressAction?: () => void;
  onReleaseAction?: () => void;
  suppressHydrationWarning?: boolean;
  longPressDelay?: number;
}

export default function BaseButton(props: Props) {
  const {
    className,
    color,
    textWrap,
    disabled,
    title,
    icon: IconNode,
    disabledIcon,
    image,
    rowSpan,
    colSpan,
    rowStart,
    colStart,
    onClickAction,
    onDoubleClickAction,
    onLongPressAction,
    onReleaseAction,
    suppressHydrationWarning,
    ...otherProps
  } = props;

  const gestureBind = useGestures<HTMLDivElement>({
    onClickAction: onClickAction,
    onDoubleClickAction: onDoubleClickAction,
    onLongPressAction: onLongPressAction,
    onReleaseAction: onReleaseAction,
    moveThreshold: 20,
    longPressDelay: props.longPressDelay,
  });

  const groupDisabled = useContext(DisabledContext);
  const isDisabled = disabled == true || groupDisabled;

  const DisplayIcon = isDisabled ? (disabledIcon ?? IconNode) : IconNode;

  return (
    <Grid.Element
      rowSpan={rowSpan}
      colSpan={colSpan}
      rowStart={rowStart}
      colStart={colStart}
      style={{overflow: "hidden"}}
    >
      <div
        data-slot="base-button"
        data-has-text={title != undefined}
        data-disabled={isDisabled}
        className={variants({
          className: className,
          color: color,
          textWrap: textWrap,
          disabled: isDisabled
        })}
        {...otherProps}
        {...(isDisabled ? {} : gestureBind)}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          gap="sm"
          className={styles["container"]}
        >
          {title && (
            <Typography.Text className={styles["title"]} suppressHydrationWarning={suppressHydrationWarning}>
              {title}
            </Typography.Text>
          )}
          {DisplayIcon && (
            <DisplayIcon className={styles["icon"]}/>
          )}
          {image && !DisplayIcon && (
            <Image className={styles["image"]} alt="image" src={image} width={64} height={64}/>
          )}
        </Flex>
      </div>
    </Grid.Element>
  )
}
