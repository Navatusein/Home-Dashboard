import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiCpu64Bit, mdiHarddisk, mdiMemory, mdiServer, mdiServerNetwork, mdiServerOff} from "@mdi/js";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {EntityNameBinarySensor, EntityNameSensor} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";
import {useEntityOff} from "@/shared/hooks/use-entity-off";
import {usePathname, useRouter} from "next/navigation";
import {numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";

type Props = {
  title: string;
  color: ColorToken;
  modal?: string;
  statusBinarySensor: EntityNameBinarySensor;
  cpuSensor: EntityNameSensor;
  memorySensor: EntityNameSensor;
  memoryFreeSensor: EntityNameSensor;
  diskSensor: EntityNameSensor;
}

export default function NodeSegment(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isOnline = !useEntityOff(props.statusBinarySensor);

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiServerNetwork} title={props.title} iconColor={props.color}/>
      <StateCard
        title={`${props.title} Status`}
        text={isOnline ? "Online" : "Offline"}
        icon={isOnline ? mdiServer : mdiServerOff}
        color={isOnline ? props.color : undefined}
        onClick={props.modal ? () => router.push(`${pathname}?modal=${props.modal}`) : undefined}
      />
      <Grid columns={2} gap="xs">
        <EntityStateCard
          title="Processor"
          icon={mdiCpu64Bit}
          entity={props.cpuSensor}
        />
        <EntityStateCard
          title="Memory Use"
          icon={mdiMemory}
          entity={props.memorySensor}
        />
        <EntityStateCard
          title="Disk Use"
          icon={mdiHarddisk}
          entity={props.diskSensor}
        />
        <EntityStateCard
          title="Memory Free"
          icon={mdiMemory}
          entity={props.memoryFreeSensor}
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
      </Grid>
    </Flex>
  )
}
