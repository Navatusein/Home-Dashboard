"use client"

import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {useEffect, useState} from "react";

type Props = BaseButtonSharedProps

export default function InfoButton(props: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BaseButton
      {...props}
      suppressHydrationWarning={true}
      title={`${time.toLocaleTimeString()}\n${time.toLocaleDateString()}`}
      colSpan={props.colSpan ?? 2}
    />
  )
}