import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./button.module.scss";
import {AllColorToken, ALL_COLORS} from "@/shared/constants/colors";
import {Icon, Typography} from "@/shared/ui-kit";
import {FontSizeToken} from "@/shared/constants/font-sizes";

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
      shape: {
        default: null,
        round: styles["shape-round"],
      },
      outline: {
        true: styles["outline"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = Omit<ComponentProps<"button">, "children"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  children?: string;
  fontSize?: FontSizeToken;
  icon?: string;
}

export default function Button(props: Props) {
  const {className, asChild = false, outline, color, shape, children, icon, fontSize = "md", ...otherProps} = props;

  const TempComponent = asChild ? Slot : "button"

  return (
    <TempComponent
      data-slot="button"
      data-clickable="true"
      className={variants({
        className: className,
        color: color,
        shape: shape,
        outline: outline
      })}
      {...otherProps}
    >
      {icon && <Icon path={icon} className={styles["icon"]}/>}
      {children && (
        <Typography.Text fontSize={fontSize}>
          {children}
        </Typography.Text>
      )}
    </TempComponent>
  )
}