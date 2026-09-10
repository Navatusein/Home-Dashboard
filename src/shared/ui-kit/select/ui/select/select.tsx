import {ComponentProps} from "react";
import {cva, VariantProps} from "class-variance-authority";
import styles from "./select.module.scss";
import {
  Root,
  Trigger,
  Value,
  Icon as SelectIcon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
} from "@radix-ui/react-select";
import {Icon} from "@/shared/ui-kit/icon";
import {mdiMenuDown} from "@mdi/js";
import {Flex, Typography} from "@/shared/ui-kit";
import {SelectItem} from "../../types/types";

const variants = cva(
  styles["menu-trigger"],
  {
    variants: {
      shape: {
        default: null,
        round: styles["shape-round"],
      },
    },
    defaultVariants: {},
  }
)

type Props = ComponentProps<typeof Root> & VariantProps<typeof variants> & {
  items: SelectItem[];
  placeholder?: string;
  placeholderIcon?: string;
  className?: string;
  compact?: boolean;
  iconOnly?: boolean;
}

export default function Select(props: Props) {
  const {className, compact, iconOnly, items, placeholder, placeholderIcon, shape, ...otherProps} = props;
  
  return (
    <Root {...otherProps}>
      <Trigger
        data-clickable="true"
        className={variants({
          className: className,
          shape: shape,
        })}
      >
        <Value
          className={styles["menu-placeholder"]}
          placeholder={
            <Flex align="center" gap="xs">
              {placeholderIcon && (
                <Icon path={placeholderIcon} color="secondary"/>
              )}
              {!iconOnly && (
                <Typography.Text textColor="secondary">
                  {placeholder ?? "Select"}
                </Typography.Text>
              )}
            </Flex>
          }
        />
        {!compact && (
          <SelectIcon className={styles["menu-select-icon"]}>
            <Icon path={mdiMenuDown} color="secondary"/>
          </SelectIcon>
        )}
      </Trigger>
      <Portal>
        <Content className={styles["menu-content"]} position="popper">
          <Viewport>
            {items.map((item) => (
              <Item
                key={item.key}
                value={item.value}
                disabled={item.disabled}
                className={styles["menu-item"]}
              >
                <ItemText>
                  <Flex align="center" gap="xs">
                    {item.icon && (
                      <Icon path={item.icon}/>
                    )}
                    {!iconOnly && (
                      <Typography.Text>
                        {item.label}
                      </Typography.Text>
                    )}
                  </Flex>
                </ItemText>
                {iconOnly && (
                  <Typography.Text>
                    {item.label}
                  </Typography.Text>
                )}
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}