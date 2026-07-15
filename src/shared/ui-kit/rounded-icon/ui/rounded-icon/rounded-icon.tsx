import {Flex, Icon} from "@/shared/ui-kit";
import styles from "./rounded-icon.module.scss";
import {COLORS, ColorToken} from "@/shared/constants/colors";
import {cva, VariantProps} from "class-variance-authority";
import {ComponentProps} from "react";
import {IconSizesToken} from "@/shared/constants/icon-sizes";

const colorVariants = Object.fromEntries(
  COLORS.map(value => [value, styles[`color-${value}`]])
) as Record<ColorToken, string>;


const variants = cva(
  styles["base"],
  {
    variants: {
      color: {
        default: null,
        ...colorVariants
      },
      clickable: {
        true: styles["clickable"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> &  {
  path: string;
  size?: IconSizesToken;
}

export default function RoundedIcon(props: Props) {
  const {className, color, clickable, style, path, size, ...otherProps} = props;

  return (
    <Flex
      data-slot="rounded-icon"
      data-clickable={clickable}
      align="center"
      justify="center"
      style={style}
      className={variants({
        className: className,
        color: color,
        clickable: clickable
      })}
      {...otherProps}
    >
      <Icon path={path} size={size}/>
    </Flex>
  )
}
