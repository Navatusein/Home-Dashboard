import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./text.module.scss";
import BaseTypography from "../base-typography/base-typography";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<typeof BaseTypography>, 'type' | 'dataSlot'> & VariantProps<typeof variants> & {
  asChild?: boolean;
}

export default function Text(props: Props) {
  return (
    <BaseTypography
      type="span"
      dataSlot="text"
      {...props}
    />
  );
}