import {ComponentProps, CSSProperties} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./grid.module.scss";
import GridElement from "../grid-element/grid-element";
import GridSection from "../grid-section/grid-section";
import GridFlow from "../grid-flow/grid-flow";
import {GAPS, GapToken} from "@/shared/constants/gaps";

const gapsColumnVariants = Object.fromEntries(
  GAPS.map(value => [value, styles[`column-gap-${value}`]])
) as Record<GapToken, string>;

const gapsRowVariants = Object.fromEntries(
  GAPS.map(value => [value, styles[`row-gap-${value}`]])
) as Record<GapToken, string>;

const gapsVariants = Object.fromEntries(
  GAPS.map(value => [value, [styles[`row-gap-${value}`], styles[`column-gap-${value}`]]])
) as Record<GapToken, string[]>;

const variants = cva(
  styles["base"],
  {
    variants: {
      columnGap: gapsColumnVariants,
      rowGap: gapsRowVariants,
      gap: gapsVariants,
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  columns: number;
  rows?: number;
}

export default function Grid(props: Props) {
  const {className, columns, rows, style, columnGap, rowGap, gap, ...otherProps} = props;

  return (
    <div
      data-slot="grid"
      style={{
        ...(style as CSSProperties),
        ["--grid-columns" as never]: columns,
        ["--grid-rows" as never]: rows
      }}
      className={variants({
        className: className,
        columnGap: columnGap,
        rowGap: rowGap,
        gap: gap
      })}
      {...otherProps}
    />
  )
}

Grid.Element = GridElement;
Grid.Section = GridSection;
Grid.Flow = GridFlow;