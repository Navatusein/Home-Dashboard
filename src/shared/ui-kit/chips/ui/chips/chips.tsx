import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./chips.module.scss";
import {Icon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";

const variants = cva(
  styles["base"],
  {
    variants: {
      clickable: {
        true: styles["clickable"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  text: string;
  color?: ColorToken;
  icon?: string;
}

export default function Chips(props: Props) {
  const {className, text, icon, color, clickable, asChild = false, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="chips"
      data-clickable={clickable}
      className={variants({
        className: className,
        clickable: clickable
      })}
      {...otherProps}
    >
      {icon && (
        <Icon path={icon} size="sm" color={color}/>
      )}
      <Typography.Text className={styles["text"]}>
        {text}
      </Typography.Text>
    </TempComponent>
  )
}