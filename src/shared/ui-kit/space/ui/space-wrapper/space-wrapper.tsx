import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./space-wrapper.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
}

export default function SpaceWrapper(props: Props) {
  const {className, ...otherProps} = props;

  return (
    <div
      data-slot="space-wrapper"
      className={variants({
        className: className
      })}
      {...otherProps}
    />
  )
}