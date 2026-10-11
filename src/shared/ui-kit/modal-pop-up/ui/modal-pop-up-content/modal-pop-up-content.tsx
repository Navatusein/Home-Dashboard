import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./modal-pop-up-content.module.scss";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
}

export default function ModalPopUpContent(props: Props) {
  const {className, ...otherProps} = props;

  return (
    <div
      data-slot="modal-pop-up-scroll-content"
      className={variants({
        className: className
      })}
      {...otherProps}
    />
  )
}
