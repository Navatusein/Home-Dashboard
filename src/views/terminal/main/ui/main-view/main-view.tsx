"use client"

import FastLaunchSegment from "../fast-launch-segment/fast-launch-segment";
import ClipboardSlotSegment from "../clipboard-slot-segment/clipboard-slot-segment";
import CommunicationControlSegment from "../communication-control-segment/communication-control-segment";
import AudioSourceSegment from "../audio-source-segment/audio-source-segment";
import MediaSegment from "../media-segment/media-segment";
import LightControlSegment from "../light-control-segment/light-control-segment";
import MomentActionSegment from "../moment-action-segment/moment-action-segment";
import MediaPlayerSegment from "../media-player-segment/media-player-segment";
import {DisabledContext} from "@/shared/contexts/disabled-context";
import {isOffState, useEntity} from "@hakit/core";

type Props = {}

export default function MainView(props: Props) {
  const agentRunningBinarySensor = useEntity("binary_sensor.navatusein_pc_agent_running");
  const isAgentOff = isOffState(agentRunningBinarySensor.state);

  return (
    <>
      <DisabledContext.Provider value={isAgentOff}>
        <FastLaunchSegment/>
        <ClipboardSlotSegment/>
        <CommunicationControlSegment/>
        <AudioSourceSegment/>
        <MediaSegment/>
        <MomentActionSegment/>
      </DisabledContext.Provider>

      <MediaPlayerSegment/>

      <LightControlSegment/>
    </>
  )
}