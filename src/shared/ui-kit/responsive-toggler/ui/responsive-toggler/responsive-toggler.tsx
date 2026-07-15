import {ComponentProps, ReactNode} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./responsive-toggler.module.scss";
import {BREAKPOINTS, BreakpointToken} from "@/shared/constants/breakpoints";

const breakpointVariants = Object.fromEntries(
  BREAKPOINTS.map(value => [value, styles[`breakpoint-${value}`]])
) as Record<BreakpointToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      breakpoint: {
        ...breakpointVariants
      },
      hide: {
        true: styles["hide"],
        false: styles["show"]
      }
    },
    defaultVariants: {
      hide: false
    },
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  children: ReactNode;
}

export default function ResponsiveToggler(props: Props) {
  const {className, breakpoint, hide, asChild = false, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="responsive-toggler"
      className={variants({
        className: className,
        breakpoint: breakpoint,
        hide: hide,
      })}
      {...otherProps}
    />
  )
}