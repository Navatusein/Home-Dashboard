import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./base-typography.module.scss";
import {FONT_SIZES, FontSizeToken} from "@/shared/constants/font-sizes";

const fontSizeVariants = Object.fromEntries(
  FONT_SIZES.map(value => [value, styles[`font-size-${value}`]])
) as Record<FontSizeToken, string>;

export const DEFAULT_FONT_SIZE = "md";

const variants = cva(
  styles["base"],
  {
    variants: {
      fontSize: {
        default: null,
        ...fontSizeVariants
      },
      textColor: {
        primary: styles["text-color-primary"],
        secondary: styles["text-color-secondary"],
      },
      colorScheme: {
        dark: styles["dark"],
        light: null,
      },
      bold: {
        true: styles["bold"],
        false: null
      }
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  type: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | string;
  dataSlot: string;
  asChild?: boolean;
}

export default function BaseTypography(props: Props) {
  const {className, asChild = false, dataSlot, type, fontSize, textColor, colorScheme, bold, ...otherProps} = props;

  const TempComponent = asChild ? Slot : type;

  return (
    <TempComponent
      data-slot={dataSlot}
      className={variants({
        className: className,
        fontSize: fontSize,
        textColor: textColor,
        colorScheme: colorScheme,
        bold: bold,
      })}
      {...otherProps}
    />
  )
}