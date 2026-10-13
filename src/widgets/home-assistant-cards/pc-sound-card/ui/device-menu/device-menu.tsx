import {DropdownMenu, RoundedIcon} from "@/shared/ui-kit";
import {isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameSelect} from "@/shared/types/ha-domains";
import styles from "./device-menu.module.scss";

type Props = {
  icon: string,
  entity: EntityNameSelect,
}

export default function DeviceMenu(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);

  const items = ((entity.attributes.options ?? []) as string[])
    .map((option) => ({key: option, label: option, selected: option == entity.state, disabled: isUnavailable}));

  return (
    <DropdownMenu
      align="end"
      modal={false}
      items={items}
      onItemSelect={(item) => entity.service.selectOption({serviceData: {option: item.key}})}
    >
      <RoundedIcon clickable path={props.icon} className={styles["trigger"]}/>
    </DropdownMenu>
  )
}
