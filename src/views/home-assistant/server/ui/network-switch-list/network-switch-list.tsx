import {Grid, SegmentHeader} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import {SwitchCard} from "@/widgets/home-assistant-cards/switch-card";
import {EntityNameSwitch} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";

type Props = {
  title: string;
  icon: string;
  color: ColorToken;
  entityPrefix: string;
  excludeEntityPrefixes?: string[];
  namePrefix: string;
  confirm?: boolean;
  tall?: boolean;
}

export default function NetworkSwitchList(props: Props) {
  // Строка вместо массива: селектор возвращает примитив, и список не перерисовывается на каждое изменение любой сущности
  const switches = useHass((state) => Object.keys(state.entities)
    .filter((entityId) => entityId.startsWith(props.entityPrefix))
    .filter((entityId) => !props.excludeEntityPrefixes?.some((prefix) => entityId.startsWith(prefix)))
    .sort()
    .map((entityId) => `${entityId}\t${state.entities[entityId].attributes.friendly_name ?? entityId}`)
    .join("\n"));

  if (!switches)
    return null;

  return (
    <>
      <SegmentHeader icon={props.icon} title={props.title} iconColor={props.color}/>
      <Grid columns={2} gap="xs">
        {switches.split("\n").map((row) => {
          const [entityId, name] = row.split("\t");

          return (
            <SwitchCard
              key={entityId}
              title={name.replace(props.namePrefix, "")}
              icon={props.icon}
              entity={entityId as EntityNameSwitch}
              color={props.color}
              confirmOn={props.confirm}
              confirmOff={props.confirm}
              tall={props.tall}
            />
          )
        })}
      </Grid>
    </>
  )
}
