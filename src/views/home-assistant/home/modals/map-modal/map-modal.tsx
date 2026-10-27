import {ModalPopUp} from "@/shared/ui-kit";
import {mdiMapMarker} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {MapCard} from "@/widgets/home-assistant-cards/map-card";
import {EntityNamePerson} from "@/shared/types/ha-domains";
import {useSearchParams} from "next/navigation";
import {useMemo} from "react";

const PERSONS: EntityNamePerson[] = ["person.bogdan", "person.iulia"];

export default function MapModal() {
  const person = useSearchParams().get("person");
  const focus = useMemo(() => person ? {key: person} : undefined, [person]);

  return (
    <QueryModalControl
      modal="map"
      size="large"
      placement="center"
    >
      <ModalPopUp.Header title="Map" icon={mdiMapMarker}/>
      <ModalPopUp.Content>
        <MapCard
          persons={PERSONS}
          focus={focus}
          fill
        />
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
