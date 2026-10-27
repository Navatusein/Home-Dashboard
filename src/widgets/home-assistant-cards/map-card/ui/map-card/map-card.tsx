import dynamic from "next/dynamic";
import {Card} from "@/shared/ui-kit";
import {useEntity, useHass} from "@hakit/core";
import styles from "./map-card.module.scss";
import {LatLngTuple} from "leaflet";
import type {LeafletMapMarker, LeafletMapZone} from "@/features/leaflet-map";
import {EntityNamePerson} from "@/shared/types/ha-domains";
import PersonPopup from "../person-popup/person-popup";
import {usePathname, useRouter} from "next/navigation";
import clsx from "clsx";

type Props = {
  persons: EntityNamePerson[];
  focus?: {key: string};
  expandModal?: string;
  fill?: boolean;
}

const LeafletMap = dynamic(() => import("@/features/leaflet-map").then(x => x.LeafletMap), {
  ssr: false
});

export default function MapCard(props: Props) {
  const pathname = usePathname();
  const router = useRouter();
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
      accuracy: isHome ? undefined : entity.attributes.gps_accuracy,
    }];
  })))).map((marker: LeafletMapMarker) => ({
    ...marker,
    popup: <PersonPopup personEntity={marker.key as EntityNamePerson}/>,
  }));

  const zones: LeafletMapZone[] = JSON.parse(useHass((state) => JSON.stringify(Object.values(state.entities)
    .filter((entity) => entity.entity_id.startsWith("zone."))
    .map((entity) => ({
      key: entity.entity_id,
      position: [entity.attributes.latitude, entity.attributes.longitude],
      radius: entity.attributes.radius,
      title: entity.attributes.friendly_name,
    })))));

  return (
    <Card className={clsx(styles["card"], props.fill && styles["fill"])} padding={0}>
      <LeafletMap
        center={center}
        markers={markers}
        zones={zones}
        focus={props.focus}
        onExpand={props.expandModal ? () => router.push(`${pathname}?modal=${props.expandModal}`) : undefined}
      />
    </Card>
  )
}
