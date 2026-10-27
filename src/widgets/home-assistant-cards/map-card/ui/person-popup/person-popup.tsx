import Image from "next/image";
import {useEntity, useHass} from "@hakit/core";
import {mdiCircleMedium, mdiClockOutline, mdiMapMarkerDistance, mdiMapMarkerOutline} from "@mdi/js";
import {Flex, Icon, Typography} from "@/shared/ui-kit";
import {
  BATTERY_PERCENT_CHARGING_ICONS,
  BATTERY_PERCENT_ICONS,
  BatteryPercentTokens
} from "@/shared/constants/battery-percent-icons";
import {EntityNamePerson} from "@/shared/types/ha-domains";
import {useNow} from "@/shared/hooks/use-now";
import {formatDuration} from "@/shared/helpers/format-duration";
import {geoDistance} from "@/shared/helpers/geo-distance";
import styles from "./person-popup.module.scss";

type Props = {
  personEntity: EntityNamePerson;
}

const ADDRESS_PARTS = 2;

export default function PersonPopup(props: Props) {
  const now = useNow(30_000);
  const joinHassUrl = useHass((state) => state.helpers.joinHassUrl);
  const personEntity = useEntity(props.personEntity);
  const homeEntity = useEntity("zone.home");
  const deviceTrackerEntity = useEntity<"device_tracker.">(personEntity.attributes.source, {
    returnNullIfNotFound: true,
  });
  const zoneEntity = useEntity<"zone.">(personEntity.attributes.in_zones[0] ?? "", {
    returnNullIfNotFound: true,
  });

  const isHome = personEntity.state == "home";
  const tracker = deviceTrackerEntity?.attributes;
  const chargePercent = Math.ceil((tracker?.battery_level ?? 100) / 10) as BatteryPercentTokens;
  const lastSeen = Date.parse(tracker?.last_seen ?? deviceTrackerEntity?.last_updated ?? personEntity.last_updated);
  const address = isHome ? null : (tracker?.address as string | undefined)?.split(", ").slice(0, ADDRESS_PARTS).join(", ");

  const distance = personEntity.attributes.latitude == null ? null : geoDistance(
    [homeEntity.attributes.latitude, homeEntity.attributes.longitude],
    [personEntity.attributes.latitude, personEntity.attributes.longitude],
  );

  const formatMinutesAgo = (time: number) => formatDuration((now - time) / 60_000);

  return (
    <Flex vertical gap="xs">
      <Flex align="center" gap="xs">
        <Image
          src={joinHassUrl(personEntity.attributes.entity_picture ?? "")}
          alt="Img"
          width={40}
          height={40}
          className={styles["avatar"]}
          unoptimized
        />
        <Flex vertical>
          <Typography.Text bold>
            {personEntity.attributes.friendly_name}
          </Typography.Text>
          <Flex align="center">
            <Icon
              path={mdiCircleMedium}
              size="sm"
              color={isHome ? "green" : "blue"}
            />
            <Typography.Text fontSize="sm" textColor="secondary">
              {zoneEntity?.attributes?.friendly_name ?? "Away"} · {formatMinutesAgo(Date.parse(personEntity.last_changed))}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical gap="xs" className={styles["details"]}>
        {address && (
          <Flex align="center" gap="xxs">
            <Icon path={mdiMapMarkerOutline} size="sm"/>
            <Typography.Text fontSize="sm">
              {address}
            </Typography.Text>
          </Flex>
        )}
        <Flex justify="space-between">
          <Flex align="center" gap="xxs">
            <Icon
              path={tracker?.battery_charging ? BATTERY_PERCENT_CHARGING_ICONS[chargePercent] : BATTERY_PERCENT_ICONS[chargePercent]}
              size="sm"
            />
            <Typography.Text fontSize="sm">
              {tracker?.battery_level ?? "—"}%
            </Typography.Text>
          </Flex>
          {!isHome && distance != null && (
            <Flex align="center" gap="xxs">
              <Icon path={mdiMapMarkerDistance} size="sm"/>
              <Typography.Text fontSize="sm">
                {distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(1)} km`}
              </Typography.Text>
            </Flex>
          )}
          <Flex align="center" gap="xxs">
            <Icon path={mdiClockOutline} size="sm"/>
            <Typography.Text fontSize="sm">
              {formatMinutesAgo(lastSeen)} ago
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
