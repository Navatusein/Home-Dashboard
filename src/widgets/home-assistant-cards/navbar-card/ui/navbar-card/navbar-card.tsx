"use client"

import {Card, Flex} from "@/shared/ui-kit";
import styles from "./navbar-card.module.scss";
import {NavbarCardItem, NavbarCardItemChild} from "../../types/types";
import NavbarItem from "../navbar-item/navbar-item";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {useUser} from "@hakit/core";

type Props = {
  items: NavbarCardItem[];
}

export default function NavbarCard(props: Props) {
  const isMobile = useBreakpoint("sm");
  const user = useUser();
  
  const halfOfItems = props.items.length / 2;
  
  const isVisible = (item: NavbarCardItemChild) => (
    (item.forUsers?.includes(user?.name ?? "default") ?? true) &&
    ((isMobile && item.hideOnMobile != true) || !isMobile)
  );

  const items = props.items
    .filter(isVisible)
    .map((item) => {
      const children = item.children?.filter(isVisible);

      return {...item, children: children?.length ? children : undefined};
    });

  return (
    <Card className={styles["nav-bar-card"]} padding="sm">
      <Flex vertical gap="sm" className={styles["nav-bar-container"]}>
        {items.map((item, index) => (
          <NavbarItem
            key={`navbar-item-${index}`}
            item={item}
            textLeft={index > halfOfItems}
          />
        ))}
      </Flex>
    </Card>
  )
}
