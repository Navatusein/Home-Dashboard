import {ComponentProps, CSSProperties} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./grid-section.module.scss";
import GridFlow from "../grid-flow/grid-flow";
import {GridFlowDirection, GridPlacementProps} from "../../types/types";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & GridPlacementProps & {
  direction?: GridFlowDirection;
}

export default function GridSection(props: Props) {
  const {className, style, direction, rowSpan, colSpan, rowStart, colStart, children, ...otherProps} = props;

  return (
    <div
      data-slot="grid-section"
      style={{
        ...(style as CSSProperties),
        ...(rowSpan != undefined && {["--grid-element-row-span" as never]: rowSpan}),
        ...(colSpan != undefined && {["--grid-element-col-span" as never]: colSpan}),
        ...(rowStart != undefined && {["--grid-element-row-start" as never]: rowStart}),
        ...(colStart != undefined && {["--grid-element-col-start" as never]: colStart})
      }}
      className={variants({
        className: className
      })}
      {...otherProps}
    >
      {direction ? (
        <GridFlow direction={direction} rowStart={rowStart} colStart={colStart}>
          {children}
        </GridFlow>
      ) : children}
    </div>
  )
}