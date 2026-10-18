"use client"

import {FC, SVGProps, useState} from "react";
import {useEntity} from "@hakit/core";
import {BaseButton, BaseButtonColors, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import delay from "@/shared/helpers/delay";

type Props = BaseButtonSharedProps & {
  text?: string;
  title?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  color?: BaseButtonColors;
}

export default function ClipboardTextButton(props: Props) {
  const {text, color, ...baseProps} = props;

  const entity = useEntity("notify.navatusein_pc_clipboard_text");

  const [copied, setCopied] = useState<boolean>(false);

  return (
    <BaseButton
      {...baseProps}
      textWrap
      disabled={text == undefined}
      color={copied ? "green" : color}
      onClickAction={async () => {
        await entity.service.sendMessage({serviceData: {message: text!}});
        setCopied(true);
        await delay(300);
        setCopied(false);
      }}
    />
  )
}
