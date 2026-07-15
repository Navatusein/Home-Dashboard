import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import Image from "next/image";
import {useEntity} from "@hakit/core";
import {
  BATTERY_PERCENT_CHARGING_ICONS,
  BATTERY_PERCENT_ICONS,
  BatteryPercentTokens
} from "@/shared/constants/battery-percent-icons";
import {EntityNamePerson} from "@/shared/types/ha-domains";

type Props = {
  personEntity: EntityNamePerson;
  imageUrl: string;
}

export default function PersonCard(props: Props) {
  const personEntity = useEntity(props.personEntity);
  const deviceTrackerEntity = useEntity<"device_tracker.">(personEntity.attributes.source, {
    returnNullIfNotFound: true,
  })
  const zoneEntity = useEntity<"zone.">(personEntity.attributes.in_zones[0] ?? "", {
    returnNullIfNotFound: true,
  });

  const chargePercent = Math.ceil((deviceTrackerEntity?.attributes?.battery_level ?? 100) / 10);

  return (
    <Card stackCount={1} padding="xs">
      <Flex align="center" gap="xs" style={{height: "100%"}}>
        <Image src={props.imageUrl} alt="Img" width={40} height={40} style={{borderRadius: "100%"}}/>
        <Flex vertical grow>
          <Typography.Text>
            {personEntity.attributes.friendly_name}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary">
            {zoneEntity?.attributes?.friendly_name ?? "Away"}
          </Typography.Text>
        </Flex>
        <RoundedIcon
          path={
            (deviceTrackerEntity?.attributes?.battery_charging ?? false) ?
              BATTERY_PERCENT_CHARGING_ICONS[chargePercent as BatteryPercentTokens] :
              BATTERY_PERCENT_ICONS[chargePercent as BatteryPercentTokens]
          }
        />
      </Flex>
    </Card>
  )
}
