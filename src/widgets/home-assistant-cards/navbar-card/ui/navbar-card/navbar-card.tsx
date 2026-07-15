"use client"

import {Card, Flex} from "@/shared/ui-kit";
import styles from "./navbar-card.module.scss";
import {NavbarCardItem} from "../../types/types";
import NavbarItem from "../navbar-item/navbar-item";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";

type Props = {
  items: NavbarCardItem[];
}

export default function NavbarCard(props: Props) {
  const isMobile = useBreakpoint("sm");

  const halfOfItems = props.items.length / 2;
  const items = props.items.filter((item) => ((
    isMobile && item.hideOnMobile != true) || !isMobile
  ));

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
