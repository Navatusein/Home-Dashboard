import {Flex} from "@/shared/ui-kit";
import {NavbarCard, NavbarCardItem} from "@/widgets/home-assistant-cards/navbar-card";
import {Chips} from "@/shared/ui-kit/chips";
import {mdiLightbulbGroup, mdiLockOpenVariant, mdiShieldHomeOutline, mdiWindowOpenVariant} from "@mdi/js";
import {ReactNode} from "react";
import styles from "./home-assistant-dashboard-layout.module.scss";
import {GreetingCard} from "@/widgets/home-assistant-cards/greeting-card";

type Props = {
  children: ReactNode;
  navbarItems: NavbarCardItem[];
}

export default function HomeAssistantDashboardLayout(props: Props) {
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
            </Flex>
          </Flex>
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}
