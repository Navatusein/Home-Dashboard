"use client"

import {Grid, Slider} from "@/shared/ui-kit"
import styles from "./slider-button.module.scss"
import {ComponentProps, useContext} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {EntityNameNumber} from "@/shared/types/ha-domains";
import {useEntity} from "@hakit/core";
import {DisabledContext} from "@/shared/contexts/disabled-context";

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        green: styles["color-green"],
        blue: styles["color-blue"]
      },
      disabled: {
        true: styles["disabled"],
        false: null
      }
    },
    defaultVariants: {
      color: "blue",
    },
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  entity: EntityNameNumber;
  rowSpan?: number;
  colSpan?: number;
  rowStart?: number;
  colStart?: number;
}

export default function SliderButton(props: Props) {
  const {
    className,
    color,
    rowSpan,
    colSpan,
    rowStart,
    colStart,
    ...otherProps
  } = props;

  const entity = useEntity(props.entity);

  const groupDisabled = useContext(DisabledContext);

  return (
    <Grid.Element
      rowSpan={rowSpan}
      colSpan={colSpan}
      rowStart={rowStart}
      colStart={colStart}
      style={{overflow: "hidden"}}
    >
      <div
        data-slot="slider-button"
        data-disabled={groupDisabled}
        className={variants({
          className: className,
          color: color,
          disabled: groupDisabled,
        })}
        {...otherProps}
      >
        <Slider
          vertical
          disabled={groupDisabled}
          className={styles["slider"]}
          min={entity.attributes.Minimum}
          max={entity.attributes.Maximum}
          step={entity.attributes.Step}
          value={[(entity.state as unknown) as number]}
          onValueChange={(value) => {
            entity.service.setValue({serviceData: {value: value[0].toString()}})
          }}
        />
      </div>
    </Grid.Element>
  )
}
