import dynamic from "next/dynamic";
import {Card} from "@/shared/ui-kit";
import {useEntity, useHass} from "@hakit/core";
import styles from "./map-card.module.scss";
import {LatLngTuple} from "leaflet";
import type {LeafletMapMarker} from "@/features/leaflet-map";
import {EntityNamePerson} from "@/shared/types/ha-domains";

type Props = {
  persons: EntityNamePerson[];
}

const PLACES: Record<string, string> = {
  home: "Home",
  not_home: "Away",
}

const LeafletMap = dynamic(() => import("@/features/leaflet-map").then(x => x.LeafletMap), {
  ssr: false
});

export default function MapCard(props: Props) {
  const homeEntity = useEntity("zone.home");
  const center: LatLngTuple = [homeEntity.attributes.latitude, homeEntity.attributes.longitude];

  const markers: LeafletMapMarker[] = JSON.parse(useHass((state) => JSON.stringify(props.persons.flatMap((person) => {
    const entity = state.entities[person];
    const isHome = entity?.state == "home";

    if (!isHome && entity?.attributes.latitude == null)
      return [];

    return [{
      key: person,
      position: isHome ? center : [entity.attributes.latitude, entity.attributes.longitude],
      imageUrl: state.helpers.joinHassUrl(entity.attributes.entity_picture ?? ""),
      title: entity.attributes.friendly_name,
      description: PLACES[entity.state] ?? entity.state,
    }];
  }))));

  return (
    <Card className={styles["card"]} padding={0}>
      <LeafletMap
        center={center}
        markers={markers}
      />
    </Card>
  )
}
