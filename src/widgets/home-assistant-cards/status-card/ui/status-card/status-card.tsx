import {ColorToken} from "@/shared/constants/colors";
import {EntityName} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {baseTextTransformer, TextTransformer} from "@/shared/text-transformers/base-text-transformer";
import StatusCardLayout from "../status-card-layout/status-card-layout";

type Props = {
  title?: string,
  icon: string,
  iconColor?: ColorToken | 'secondary',
  entity: EntityName,
  textTransformer?: TextTransformer,
  onClick?: () => void,
}

export default function StatusCard(props: Props) {
  const entity = useEntity(props.entity);

  const transformer = props.textTransformer ?? baseTextTransformer;

  return (
    <StatusCardLayout
      title={props.title ?? entity.attributes.friendly_name ?? ""}
      text={`${transformer(entity.state)}${entity.attributes.unit_of_measurement ?? ""}`}
      icon={props.icon}
      iconColor={props.iconColor}
      onClick={props.onClick}
    />
  )
}
