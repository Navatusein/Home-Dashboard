import {Flex, Icon, Typography} from "@/shared/ui-kit";
import {NavbarCardItemChild} from "../../types/types";
import styles from "./navbar-button.module.scss"

type Props = {
  item: NavbarCardItemChild;
  isActive: boolean;
  isChild: boolean;
  textLeft?: boolean;
  onClick: () => void;
}

export default function NavbarButton(props: Props) {
  return (
    <Flex
      key={props.item.path}
      vertical
      align="center"
      className={styles["item"]}
      data-is-active={props.isActive}
      data-is-child={props.isChild}
      data-color={props.item.color}
      data-is-text-left={props.textLeft ?? false}
      onClick={props.onClick}
    >
      <Flex vertical align="center" justify="center" className={styles["icon-container"]}>
        <Icon path={props.item.icon} size="lg" className={styles["icon"]}/>
      </Flex>
      <Typography.Text>
        {props.item.title}
      </Typography.Text>
    </Flex>
  )
}
