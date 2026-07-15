import {cva, VariantProps} from "class-variance-authority";
import styles from "./icon.module.scss";
import {COLORS, ColorToken} from "@/shared/constants/colors";
import {Icon as MdiIcon} from "@mdi/react";
import {IconProps} from "@mdi/react/dist/IconProps";
import {ICON_SIZES, IconSizesToken} from "@/shared/constants/icon-sizes";

const colorVariants = Object.fromEntries(
  COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<ColorToken, string>;

const iconSizesVariants = Object.fromEntries(
  ICON_SIZES.map(value => [value, styles[`icon-size-${value}`]])
) as Record<IconSizesToken, string>;


const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...colorVariants,
        secondary: styles['color-secondary']
      },
      size: {
        ...iconSizesVariants
      }
    },
    defaultVariants: {
      size: "md"
    },
  }
)

type Props = IconProps & VariantProps<typeof variants> & {
  path: string;
}

export default function Icon(props: Props) {
  const {className, color, path, size, ...otherProps} = props;

  return (
    <MdiIcon
      data-slot="icon"
      className={variants({
        className: className,
        color: color,
        size: size
      })}
      path={path}
      {...otherProps}
    />
  )
}