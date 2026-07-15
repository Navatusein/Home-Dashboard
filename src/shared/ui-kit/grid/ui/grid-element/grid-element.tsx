import {ComponentProps, CSSProperties} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./grid-element.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  rowSpan?: number;
  colSpan?: number;
  rowStart?: number;
  colStart?: number;
}

export default function GridElement(props: Props) {
  const {className, asChild = false, style, rowSpan, colSpan, rowStart, colStart, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="grid-element"
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
    />
  )
}