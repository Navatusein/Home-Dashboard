import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./column.module.scss";
import {clsx} from "clsx";
import {ColumnBreakPointType, ColumnCountType} from "../../types/type";
import {BREAKPOINTS, BreakpointTypeHelper} from "@/shared/constants/breakpoints";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> &
  VariantProps<typeof variants> &
  BreakpointTypeHelper<ColumnCountType|ColumnBreakPointType> &
{
  asChild?: boolean;
  span?: ColumnCountType;
  offset?: ColumnCountType;
  order?: ColumnCountType;
}

export default function Column(props: Props) {
  const {className, span, offset, order, asChild = false, ...otherProps} = props;

  let sizeClassObj: Record<string, boolean> = {};

  BREAKPOINTS.forEach(breakpoint => {
    let parsedBreakpointProp: ColumnBreakPointType = {};

    const breakpointProp = props[breakpoint];

    delete otherProps[breakpoint];

    if (typeof breakpointProp == "number") {
      parsedBreakpointProp.span = breakpointProp;
    }
    else if (typeof breakpointProp == "object") {
      parsedBreakpointProp = breakpointProp || {};
    }

    sizeClassObj = {
      ...sizeClassObj,
      [styles[`span-${breakpoint}-${parsedBreakpointProp.span}`]]: parsedBreakpointProp.span !== undefined,
      [styles[`offset-${breakpoint}-${parsedBreakpointProp.offset}`]]: parsedBreakpointProp.offset !== undefined,
      [styles[`order-${breakpoint}-${parsedBreakpointProp.order}`]]: parsedBreakpointProp.order !== undefined,
    }
  })

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="bootstrap-column"
      className={clsx(
        variants({
            className: className,
        }),
        {
          [styles[`span-default-${span}`]]: span !== undefined,
          [styles[`offset-default-${offset}`]]: offset !== undefined,
          [styles[`order-default-${order}`]]: order !== undefined,
        },
        sizeClassObj
      )}
      {...otherProps}
    />
  )
}