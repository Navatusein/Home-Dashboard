"use client"

import {ComponentProps, ReactNode, useRef, useState} from "react";
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
  modal?: boolean;
  onItemSelect?: (item: DropdownItem, event: Event) => void;
}

export default function DropdownMenu(props: Props) {
  const {className, children, items, modal, onItemSelect, ...otherProps} = props;

  const [isOpen, setIsOpen] = useState(false);
  const isTouchRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenuRoot modal={modal} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        ref={triggerRef}
        asChild
        className={styles["menu-trigger"]}
        onPointerDown={(event) => {
          isTouchRef.current = event.pointerType == "touch";

          if (isTouchRef.current)
            event.preventDefault();
        }}
        onClick={() => {
          if (isTouchRef.current)
            setIsOpen((value) => !value);
        }}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className={variants({
            className: className
          })}
          avoidCollisions
          onInteractOutside={(event) => {
            if (triggerRef.current?.contains(event.target as Node))
              event.preventDefault();
          }}
          {...otherProps}
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              data-selected={item.selected || undefined}
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