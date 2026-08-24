import SegmentPcControl from "../segment-pc-control/segment-pc-control";
import SegmentFastLaunch from "../segment-fast-launch/segment-fast-launch";
import SegmentStatus from "../segment-status/segment-status";
import SegmentDevelop from "../segment-develop/segment-develop";

export default function SystemView() {
  return (
    <>
      <SegmentStatus/>
      <SegmentFastLaunch/>
      <SegmentPcControl/>
      <SegmentDevelop/>
    </>
  )
}
