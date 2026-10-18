import Image from "next/image";
import {useEntity, useHass} from "@hakit/core";
import {EntityNamePerson} from "@/shared/types/ha-domains";

type Props = {
  person: EntityNamePerson;
}

export default function PersonAvatar(props: Props) {
  const personEntity = useEntity(props.person);
  const joinHassUrl = useHass((state) => state.helpers.joinHassUrl);

  return (
    <Image
      src={joinHassUrl(personEntity.attributes.entity_picture ?? "")}
      alt={personEntity.attributes.friendly_name ?? "Img"}
      width={40}
      height={40}
      style={{borderRadius: 12, filter: personEntity.state == "home" ? undefined : "grayscale(1) brightness(0.6)"}}
      unoptimized
    />
  )
}
