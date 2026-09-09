"use client"

import {ComponentProps, ReactNode} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown-menu.module.scss";
import {Icon, Typography} from "@/shared/ui-kit";
import {DropdownItem} from "../../types/types";

const variants = cva(
  styles["menu-content"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<typeof DropdownMenuContent> & VariantProps<typeof variants> & {
  children?: ReactNode;
  items: DropdownItem[];
  onItemSelect?: (item: DropdownItem, event: Event) => void;
}

export default function DropdownMenu(props: Props) {
  const {className, children, items, onItemSelect, ...otherProps} = props;

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild className={styles["menu-trigger"]}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className={variants({
            className: className
          })}
          avoidCollisions
          {...otherProps}
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              data-selected={item.selected}
              className={styles["menu-item"]}
              onSelect={(event) => {
                onItemSelect?.(item, event);
                item.onItemSelect?.(item, event);
              }}
            >
              {item.icon && (
                <Icon path={item.icon}/>
              )}
              <Typography.Text>
                {item.label}
              </Typography.Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
}