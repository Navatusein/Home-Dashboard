import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./text.module.scss";
import BaseTypography, {DEFAULT_FONT_SIZE} from "../base-typography/base-typography";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<typeof BaseTypography>, "type" | "dataSlot"> & VariantProps<typeof variants> & {
  asChild?: boolean;
}

export default function Text(props: Props) {
  const {className, fontSize = DEFAULT_FONT_SIZE, ...otherProps} = props;

  return (
    <BaseTypography
      type="span"
      dataSlot="text"
      className={variants({className: className})}
      fontSize={fontSize}
      {...otherProps}
    />
  );
}