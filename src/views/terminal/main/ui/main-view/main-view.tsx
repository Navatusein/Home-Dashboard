"use client"

import FastLaunchSegment from "../../segments/fast-launch-segment/fast-launch-segment";
import ClipboardSlotSegment from "../../segments/clipboard-slot-segment/clipboard-slot-segment";
import CommunicationControlSegment from "../../segments/communication-control-segment/communication-control-segment";
import AudioSourceSegment from "../../segments/audio-source-segment/audio-source-segment";
import MediaSegment from "../../segments/media-segment/media-segment";
import LightControlSegment from "../../segments/light-control-segment/light-control-segment";
import MomentActionSegment from "../../segments/moment-action-segment/moment-action-segment";
import MediaPlayerSegment from "../../segments/media-player-segment/media-player-segment";
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