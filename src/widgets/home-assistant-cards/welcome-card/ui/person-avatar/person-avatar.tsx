import Image from "next/image";
import {useEntity} from "@hakit/core";
import {WelcomeCardPerson} from "../../types/types";

type Props = {
  person: WelcomeCardPerson;
}

export default function PersonAvatar(props: Props) {
  const personEntity = useEntity(props.person.entity);

  return (
    <Image
      src={props.person.imageUrl}
      alt={personEntity.attributes.friendly_name ?? "Img"}
      width={40}
      height={40}
      style={{borderRadius: 12, filter: personEntity.state == "home" ? undefined : "grayscale(1) brightness(0.6)"}}
    />
  )
}
