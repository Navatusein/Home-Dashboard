import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./chips.module.scss";
import {Icon, Typography} from "@/shared/ui-kit";
import {ALL_COLORS, AllColorToken, ColorToken} from "@/shared/constants/colors";

const allColorVariants = Object.fromEntries(
  ALL_COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<AllColorToken, string>;

const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...allColorVariants
      },
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
  text?: string;
  iconColor?: ColorToken;
  icon?: string;
}

export default function Chips(props: Props) {
  const {className, text, icon, iconColor, color, clickable, asChild = false, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="chips"
      data-clickable={clickable}
      className={variants({
        className: className,
        color: color,
        clickable: clickable
      })}
      {...otherProps}
    >
      {icon && (
        <Icon path={icon} size="sm" color={iconColor}/>
      )}
      {text && (
        <Typography.Text className={styles["text"]} fontSize="sm">
          {text}
        </Typography.Text>
      )}
    </TempComponent>
  )
}