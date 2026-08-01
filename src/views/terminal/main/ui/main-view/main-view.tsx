"use client"

import SegmentFastLaunch from "../segment-fast-launch/segment-fast-launch";
import SegmentClipboardSlot from "../segment-clipboard-slot/segment-clipboard-slot";
import SegmentCommunicationControl from "../segment-communication-control/segment-communication-control";
import SegmentAudioSource from "../segment-audio-source/segment-audio-source";
import SegmentMedia from "../segment-media/segment-media";
import SegmentLightControl from "../segment-light-control/segment-light-control";
import SegmentMomentAction from "../segment-moment-action/segment-moment-action";
import SegmentMediaPlayer from "../segment-media-player/segment-media-player";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";

export default function MainView() {
  return (
    <>
      <AgentDisabledProvider>
        <SegmentFastLaunch/>
        <SegmentClipboardSlot/>
        <SegmentCommunicationControl/>
        <SegmentAudioSource/>
        <SegmentMedia/>
        <SegmentMomentAction/>
      </AgentDisabledProvider>

      <SegmentMediaPlayer/>

      <SegmentLightControl/>
    </>
  )
}