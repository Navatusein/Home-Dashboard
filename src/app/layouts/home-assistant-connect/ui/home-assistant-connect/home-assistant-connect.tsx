"use client"

import {ReactNode} from "react";
import dynamic from 'next/dynamic';
import {DISABLE_HOME_ASSISTANT} from "@/shared/constants/development";
import {useIsNative} from "@/shared/hooks/use-is-native";

type Props = {
  children: ReactNode;
  homeAssistantUrl: string;
}

const HassConnect = dynamic(
  () => import('@hakit/core').then(mod => mod.HassConnect),
  {ssr: false}
);

const OfflinePlayerView = dynamic(
  () => import('@/views/offline-player').then(mod => mod.OfflinePlayerView),
  {ssr: false}
);

const LOADING_FALLBACK_DELAY = 5000;

export default function HomeAssistantConnect(props: Props) {
  const isNative = useIsNative();

  if (DISABLE_HOME_ASSISTANT) {
    return props.children;
  }

  return (
    <HassConnect
      hassUrl={props.homeAssistantUrl}
      loading={isNative ? <OfflinePlayerView delay={LOADING_FALLBACK_DELAY}/> : "loading"}
      options={isNative ? {renderError: (error) => <OfflinePlayerView error={error}/>} : undefined}
    >
      {props.children}
    </HassConnect>
  );
}
