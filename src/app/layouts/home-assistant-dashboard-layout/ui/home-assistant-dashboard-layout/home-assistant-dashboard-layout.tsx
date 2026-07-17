"use client"

import {Flex} from "@/shared/ui-kit";
import {NavbarCard, NavbarCardItem} from "@/widgets/home-assistant-cards/navbar-card";
import {Chips} from "@/shared/ui-kit/chips";
import {
  mdiLightbulbGroup,
  mdiLockOpenVariant,
  mdiShieldHomeOutline,
  mdiTabletDashboard,
  mdiWindowOpenVariant
} from "@mdi/js";
import {ReactNode, useState} from "react";
import styles from "./home-assistant-dashboard-layout.module.scss";
import {GreetingCard} from "@/widgets/home-assistant-cards/greeting-card";
import {useRouter, useSearchParams} from "next/navigation";
import {buildPath, TERMINAL_QUERY_PARAM} from "@/shared/helpers/terminal-path-builder";

type Props = {
  children: ReactNode;
  navbarItems: NavbarCardItem[];
}

export default function HomeAssistantDashboardLayout(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fromTerminal] = useState(() => searchParams.has(TERMINAL_QUERY_PARAM));

  return (
    <Flex vertical className={styles["page-container"]}>
      <Flex grow className={styles["page-content-container"]}>
        <NavbarCard items={props.navbarItems}/>
        <Flex vertical gap="sm" grow>
          <Flex justify="space-between">
            <GreetingCard/>
            <Flex gap="xs">
              <Chips text="6" icon={mdiLightbulbGroup} color="orange"/>
              <Chips text="3" icon={mdiWindowOpenVariant} color="yellow"/>
              <Chips text="Home" icon={mdiShieldHomeOutline} color="green"/>
              <Chips text="" icon={mdiLockOpenVariant} color="red"/>
              {fromTerminal && (
                <Chips
                  text="Terminal"
                  icon={mdiTabletDashboard}
                  color="teal"
                  clickable
                  onClick={() => router.push(buildPath())}
                />
              )}
            </Flex>
          </Flex>
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}
