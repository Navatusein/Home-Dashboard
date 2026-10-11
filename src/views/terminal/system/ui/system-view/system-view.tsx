import SegmentPcControl from "../segment-pc-control/segment-pc-control";
import SegmentFastLaunch from "../segment-fast-launch/segment-fast-launch";
import SegmentStatus from "../segment-status/segment-status";
import SegmentDevelop from "../segment-develop/segment-develop";
import SegmentPowerGrid from "../segment-power-grid/segment-power-grid";
import SegmentServers from "../segment-servers/segment-servers";

export default function SystemView() {
  return (
    <>
      <SegmentStatus/>
      <SegmentPowerGrid/>
      <SegmentServers/>
      <SegmentFastLaunch/>
      <SegmentPcControl/>
      <SegmentDevelop/>
    </>
  )
}
