import {useEntity} from "@hakit/core";
import {useState} from "react";
import TrashIcon from "@public/icons/software-editors-and-uI/trash.svg";
import ClipboardIcon from "@public/icons/software-editors-and-uI/clipboard.svg";
import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";

type Props = BaseButtonSharedProps & {
  slotIndex: number
}

export default function ClipboardSlotButton(props: Props) {
  const {slotIndex, ...baseProps} = props;

  const stateEntity = useEntity(`sensor.navatusein_pc_clipboard_slot_${slotIndex}`);
  const savePasteEntity = useEntity(`button.navatusein_pc_clipboard_slot_${slotIndex}_save_paste`);
  const clearPasteEntity = useEntity(`button.navatusein_pc_clipboard_slot_${slotIndex}_clear`);

  const [clearFlag, setClearFlag] = useState<boolean>(false);

  const isEmpty = stateEntity.state == "Empty" || stateEntity.state == "unavailable";

  const title = clearFlag ? undefined : (
    isEmpty ? `Slot ${slotIndex}` : stateEntity.state
  );

  const icon = clearFlag ? TrashIcon : (
    isEmpty ? ClipboardIcon : undefined
  )

  return (
    <BaseButton
      {...baseProps}
      title={title}
      icon={icon}
      textWrap
      color={clearFlag ? "red" : undefined}
      onClickAction={() => savePasteEntity.service.press()}
      onLongPressAction={() => setClearFlag(true)}
      onReleaseAction={() => {
        if (clearFlag) {
          setClearFlag(false);
          clearPasteEntity.service.press();
        }
      }}
    />
  )
}