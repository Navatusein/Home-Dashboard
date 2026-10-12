import dynamic from "next/dynamic";
import {Card} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import styles from "./map-card.module.scss";
import {LatLngTuple} from "leaflet";
import type {LeafletMapMarker} from "@/features/leaflet-map";
import {MapCardPerson} from "../../types/types";

type Props = {
  center: LatLngTuple;
  persons: MapCardPerson[];
}

const PLACES: Record<string, string> = {
  home: "Home",
  not_home: "Away",
}

const LeafletMap = dynamic(() => import("@/features/leaflet-map").then(x => x.LeafletMap), {
  ssr: false
});

export default function MapCard(props: Props) {
  const markers: LeafletMapMarker[] = JSON.parse(useHass((state) => JSON.stringify(props.persons.flatMap((person) => {
    const entity = state.entities[person.entity];
    const isHome = entity?.state == "home";

    if (!isHome && entity?.attributes.latitude == null)
      return [];

    return [{
      key: person.entity,
      position: isHome ? props.center : [entity.attributes.latitude, entity.attributes.longitude],
      imageUrl: person.imageUrl,
      title: entity.attributes.friendly_name,
      description: PLACES[entity.state] ?? entity.state,
    }];
  }))));

  return (
    <Card className={styles["card"]} padding={0}>
      <LeafletMap
        center={props.center}
        markers={markers}
      />
    </Card>
  )
}
