import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiBatteryChargingHigh,
  mdiBatteryClock,
  mdiCalendarCheck,
  mdiCalendarClock,
  mdiCalendarQuestion,
  mdiCalendarRemove,
  mdiTransmissionTowerImport,
  mdiTransmissionTowerOff
} from "@mdi/js";
import {isUnavailableState, useEntity} from "@hakit/core";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {useNow} from "@/shared/hooks/use-now";
import {formatDuration} from "@/shared/helpers/format-duration";

const TOMORROW_STATUS: Record<string, string> = {
  no_outages: "No Outages",
  schedule_applies: "Scheduled",
  waiting_for_schedule: "Pending",
  emergency_shutdowns: "Emergency",
};

export default function OutageSegment() {
  const now = useNow(30_000);

  const inputSource = useEntity("sensor.gx_device_ac_active_input_source");
  const nextPlanned = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_next_planned_outage");
  const nextProbable = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_next_probable_outage");
  const nextConnectivity = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_next_connectivity");
  const statusTomorrow = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_status_tomorrow");
  const batteryRuntime = useEntity("sensor.victron_battery_runtime");
  const batteryChargeTime = useEntity("sensor.victron_battery_charge_time");

  const minutesUntil = (state: string) => isUnavailableState(state) ? null : (Date.parse(state) - now) / 60_000;

  const isGrid = inputSource.state == "grid";
  const plannedIn = minutesUntil(nextPlanned.state);
  const probableIn = minutesUntil(nextProbable.state);
  const connectivityIn = minutesUntil(nextConnectivity.state);
  const runtime = isUnavailableState(batteryRuntime.state) ? null : Number(batteryRuntime.state) * 60;
  const chargeTime = isUnavailableState(batteryChargeTime.state) ? null : Number(batteryChargeTime.state);
  const outageIn = plannedIn ?? probableIn;

  const isRuntimeShort = runtime != null && connectivityIn != null && runtime < connectivityIn;
  const isChargeLong = chargeTime != null && outageIn != null && chargeTime > outageIn;

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTransmissionTowerOff} title="Outages" iconColor="red"/>
      {isGrid && chargeTime != null && (
        <StateCard
          title="Battery Full"
          text={`In ${formatDuration(chargeTime)}`}
          icon={mdiBatteryChargingHigh}
          color={isChargeLong ? "red" : "green"}
        />
      )}
      {isGrid ? (
        <Grid columns={2} gap="xs">
          <StateCard
            title="Next Outage"
            text={
              plannedIn != null ? `In ${formatDuration(plannedIn)}`
                : probableIn != null ? `In ~${formatDuration(probableIn)}`
                  : "Not Expected"
            }
            icon={plannedIn != null ? mdiCalendarRemove : probableIn != null ? mdiCalendarQuestion : mdiCalendarCheck}
            color={plannedIn != null ? "orange" : probableIn != null ? "yellow" : "green"}
          />
          <StateCard
            title="Tomorrow"
            text={TOMORROW_STATUS[statusTomorrow.state] ?? "Unknown"}
            icon={mdiCalendarClock}
          />
        </Grid>
      ) : (
        <Grid columns={2} gap="xs">
          <StateCard
            title="Power Back"
            text={connectivityIn != null ? `In ${formatDuration(connectivityIn)}` : "Unknown"}
            icon={mdiTransmissionTowerImport}
            color="blue"
          />
          <StateCard
            title="Battery Runtime"
            text={runtime != null ? formatDuration(runtime) : "Calculating"}
            icon={mdiBatteryClock}
            color={isRuntimeShort ? "red" : "green"}
          />
        </Grid>
      )}
    </Flex>
  )
}
