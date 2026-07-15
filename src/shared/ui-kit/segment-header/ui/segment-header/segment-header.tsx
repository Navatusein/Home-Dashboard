import {ComponentProps} from "react";
import {Slot} from "@radix-ui/react-slot"
import {cva, VariantProps} from "class-variance-authority";
import styles from "./segment-header.module.scss";
import Link from "next/link";
import {mdiChevronRight} from "@mdi/js";
import {Flex, Icon, Typography} from "@/shared/ui-kit";

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & VariantProps<typeof variants> & {
  asChild?: boolean;
  title: string;
  icon?: string;
  link?: string;
}

export default function SegmentHeader(props: Props) {
  const {className, title, icon, link, children, asChild = false, ...otherProps} = props;

  const TempComponent = asChild ? Slot : "div"

  return (
    <TempComponent
      data-slot="segment-header"
      className={variants({
        className: className
      })}
      {...otherProps}
    >
      <Link href={link ?? ""} className={styles["link"]} data-has-link={link != null}>
        <Flex align="center" gap="xs">
          {icon && (
            <Icon path={icon} className={styles["icon"]}/>
          )}
          <Typography.Text className={styles["title"]}>
            {title}
          </Typography.Text>
          {link && (
            <Icon path={mdiChevronRight} className={styles["icon"]}/>
          )}
        </Flex>
      </Link>
      <Flex align="center" gap="xs">
        {children}
      </Flex>
    </TempComponent>
  )
}