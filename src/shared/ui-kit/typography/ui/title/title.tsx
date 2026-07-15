import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./title.module.scss";
import BaseTypography from "@/shared/ui-kit/typography/ui/base-typography/base-typography";

enum LEVELS {"h1", "h2", "h3", "h4", "h5", "h6"}

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<typeof BaseTypography>, 'type' | 'dataSlot'> & VariantProps<typeof variants> & {
  level?: 1|2|3|4|5|6;
}

export default function Title(props: Props) {
  const {level = 1} = props;

  return (
    <BaseTypography
      type={LEVELS[level - 1]}
      dataSlot="title"
      {...props}
    />
  )
}