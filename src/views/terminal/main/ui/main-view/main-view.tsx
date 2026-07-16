"use client"

import FastLaunchSegment from "../segment-fast-launch/segment-fast-launch";
import ClipboardSlotSegment from "../segment-clipboard-slot/segment-clipboard-slot";
import CommunicationControlSegment from "../segment-communication-control/segment-communication-control";
import AudioSourceSegment from "../segment-audio-source/segment-audio-source";
import MediaSegment from "../segment-media/segment-media";
import LightControlSegment from "../segment-light-control/segment-light-control";
import MomentActionSegment from "../segment-moment-action/segment-moment-action";
import MediaPlayerSegment from "../segment-media-player/segment-media-player";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

export default function MainView() {
  return (
    <>
      <AgentDisabledProvider>
        <FastLaunchSegment/>
        <ClipboardSlotSegment/>
        <CommunicationControlSegment/>
        <AudioSourceSegment/>
        <MediaSegment/>
        <MomentActionSegment/>
      </AgentDisabledProvider>

      <MediaPlayerSegment/>

      <LightControlSegment/>
    </>
  )
}