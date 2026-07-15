"use client"

import {ReactNode} from "react";
import dynamic from 'next/dynamic';
import {DISABLE_HOME_ASSISTANT} from "@/shared/constants/development";

type Props = {
  children: ReactNode;
  homeAssistantUrl: string;
}

const HassConnect = dynamic(
  () => import('@hakit/core').then(mod => mod.HassConnect),
  {ssr: false}
);

export default function HomeAssistantConnect(props: Props) {
  if (DISABLE_HOME_ASSISTANT) {
    return props.children;
  }

  return (
    <HassConnect hassUrl={props.homeAssistantUrl} loading={"loading"}>
      {props.children}
    </HassConnect>
  );
}