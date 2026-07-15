import dynamic from "next/dynamic";
import {Card} from "@/shared/ui-kit";
import styles from "./map-card.module.scss";
import {LatLngExpression, LatLngTuple} from "leaflet";

type Props = {
  center: LatLngExpression | LatLngTuple;
}

const LeafletMap = dynamic(() => import("@/features/leaflet-map").then(x => x.LeafletMap), {
  ssr: false
});

export default function MapCard(props: Props) {
  return (
    <Card className={styles["card"]} padding={0}>
      <LeafletMap
        center={props.center}
        posix={props.center}
      />
    </Card>
  )
}
