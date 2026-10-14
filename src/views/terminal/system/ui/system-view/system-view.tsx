import PcControlSegment from "../../segments/pc-control-segment/pc-control-segment";
import FastLaunchSegment from "../../segments/fast-launch-segment/fast-launch-segment";
import StatusSegment from "../../segments/status-segment/status-segment";
import DevelopSegment from "../../segments/develop-segment/develop-segment";
import PowerGridSegment from "../../segments/power-grid-segment/power-grid-segment";

export default function SystemView() {
  return (
    <>
      <StatusSegment/>
      <PowerGridSegment/>
      <FastLaunchSegment/>
      <PcControlSegment/>
      <DevelopSegment/>
    </>
  )
}
