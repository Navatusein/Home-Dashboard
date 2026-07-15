import {Children, ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./space.module.scss";
import {GAPS, GapToken} from "@/shared/constants/gaps";
import SpaceWrapper from "@/shared/ui-kit/space/ui/space-wrapper/space-wrapper";
import SpaceSeparator from "@/shared/ui-kit/space/ui/space-separator/space-separator";

const gapsVariants = Object.fromEntries(
  GAPS.map(value => [value, styles[`gap-${value}`]])
) as Record<GapToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      gap: {
        ...gapsVariants
      },
      align: {
        start: styles["align-start"],
        end: styles["align-end"],
        center: styles["align-center"],
      },
      wrap: {
        true: styles["wrap"],
        false: null
      },
      vertical: {
        true: styles["vertical"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  separator?: boolean;
  compact?: boolean;
}

export default function Space(props: Props) {
  const {className, children, gap, align, wrap, vertical, separator, compact, ...otherProps} = props;

  return (
    <div
      data-slot="space"
      space-compact={compact ? (vertical ? "vertical" : "horizontal") : null}
      className={variants({
        className: className,
        gap: gap,
        align: align,
        wrap: wrap,
        vertical: vertical
      })}
      {...otherProps}
    >
      {Children.map(children, (child, index) => (
        <>
          <SpaceWrapper>
            {child}
          </SpaceWrapper>
          {separator == true && index != Children.count(children) - 1 && (
            <SpaceSeparator vertical={vertical}/>
          )}
        </>
      ))}
    </div>
  )
}