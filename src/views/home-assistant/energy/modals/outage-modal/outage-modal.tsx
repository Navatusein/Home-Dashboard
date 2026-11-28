import {useState} from "react";
import {Flex, Grid, ModalPopUp, Segmented, Typography} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {
  mdiBatteryChargingHigh,
  mdiBatteryClock,
  mdiCalendarClock,
  mdiFlash,
  mdiFlashOff,
  mdiTransmissionTowerOff
} from "@mdi/js";
import {isUnavailableState} from "@hakit/core";
import {useEntity} from "@/shared/hooks/use-entity";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {QueryModalControl} from "@/features/query-modal-control";
import {OutageTimelineCard} from "@/widgets/home-assistant-cards/outage-timeline-card";
import {useNow} from "@/shared/hooks/use-now";
import {TimeRange, useCalendarEvents} from "@/shared/hooks/use-calendar-events";
import {useStateRanges} from "@/shared/hooks/use-state-ranges";
import {useHistoryStates} from "@/shared/hooks/use-history-states";
import {formatDuration} from "@/shared/helpers/format-duration";
import {formatTime} from "@/shared/helpers/format-time";
import {clipRanges, dropShortRanges, mergeRanges} from "@/shared/helpers/time-ranges";
import {OUTAGE_STATUS} from "../../constants/outage-status";
import {getDayStatus} from "../../helpers/day-status";

const DAYS = [
  {value: -1, text: "Yesterday"},
  {value: 0, text: "Today"},
  {value: 1, text: "Tomorrow"},
];

const formatDateTime = (time: number) => new Date(time).toLocaleString("en-GB", {day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"});
const shiftDays = (time: number, days: number) => new Date(time).setDate(new Date(time).getDate() + days);

export default function OutageModal() {
  const [day, setDay] = useState(0);
  const now = useNow(60_000);

  const updatedOn = useEntity("sensor.vul_stusa_vasilia_9_schedule_updated_on");
  const dataChangedOn = useEntity("sensor.vul_stusa_vasilia_9_schedule_data_changed_on");
  const batteryRuntime = useEntity("sensor.victron_battery_runtime");
  const batteryChargeTime = useEntity("sensor.victron_battery_charge_time");
  const batteryCharge = useEntity("sensor.pylontech_battery_id_512_charge");

  const todayStart = new Date(now).setHours(0, 0, 0, 0);
  const dayStart = shiftDays(todayStart, day);

  const planned = useCalendarEvents("calendar.vul_stusa_vasilia_9_planned_outages", todayStart, shiftDays(todayStart, 2), dataChangedOn.state);
  const scheduled = useCalendarEvents("calendar.vul_stusa_vasilia_9_scheduled_outages", todayStart, shiftDays(todayStart, 2), dataChangedOn.state);
  const actual = dropShortRanges(mergeRanges(useStateRanges("sensor.gx_device_ac_active_input_source", "not_connected", shiftDays(todayStart, -1), now), 5), 5);
  const schedule = useStateRanges("sensor.vul_stusa_vasilia_9_electricity", "planned_outage", shiftDays(todayStart, -1), now);
  const batteryHistory = useHistoryStates(["sensor.pylontech_battery_id_512_charge"], (now - shiftDays(todayStart, -1)) / 3_600_000);
  const charging = dropShortRanges(mergeRanges(useStateRanges("sensor.gx_device_dc_battery_state", "charging", shiftDays(todayStart, -1), now), 5), 5);

  const current = planned.find(([from, to]) => from <= now && to > now);
  const next = planned.filter(([from]) => from > now).sort(([a], [b]) => a - b)[0];
  const isYesterday = day == -1;
  const dayEnd = shiftDays(dayStart, 1);
  const status = isYesterday ? null : getDayStatus(planned, scheduled, dayStart, dayEnd);
  const isPending = status == "waiting_for_schedule";
  const dayMinutes = (dayEnd - dayStart) / 60_000;
  const runtime = isUnavailableState(batteryRuntime.state) ? null : Number(batteryRuntime.state) * 60;
  const chargeTime = isUnavailableState(batteryChargeTime.state) ? null : Number(batteryChargeTime.state);
  const neededMinutes = current ? (current[1] - now) / 60_000 : next ? (next[1] - next[0]) / 60_000 : null;
  const nextInMinutes = next ? (next[0] - now) / 60_000 : null;
  const updatedTime = isUnavailableState(updatedOn.state) ? null : Date.parse(updatedOn.state);

  const sumMinutes = (ranges: TimeRange[]) => ranges
    .reduce((sum, [from, to]) => sum + Math.max(0, Math.min(to, dayEnd) - Math.max(from, dayStart)) / 60_000, 0);
  const outages = isYesterday ? actual
    : day == 0 ? mergeRanges([...clipRanges(actual, todayStart, now), ...clipRanges(planned, now, dayEnd)])
      : planned;
  const outagesSchedule = isYesterday ? schedule : day == 0 ? clipRanges(schedule, todayStart, now) : undefined;
  const outageMinutes = sumMinutes(outages);

  return (
    <QueryModalControl modal="outage">
      <ModalPopUp.Header title="Outage Schedule" icon={mdiTransmissionTowerOff}>
        <Flex justify="center">
          <Segmented options={DAYS} value={day} onChange={setDay} color="blue"/>
        </Flex>
        {(isPending || status == "emergency_shutdowns") && (
          <Flex justify="center">
            <Chips
              text={OUTAGE_STATUS[status]}
              icon={mdiCalendarClock}
              iconColor="orange"
            />
          </Flex>
        )}
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          {!isPending && (
            <Grid columns={2} gap="xs">
              <StateCard
                title="Power"
                text={formatDuration(dayMinutes - outageMinutes)}
                icon={mdiFlash}
                color="teal"
              />
              <StateCard
                title={isYesterday ? `Planned ${formatDuration(sumMinutes(schedule))}` : "Outage"}
                text={formatDuration(outageMinutes)}
                icon={mdiFlashOff}
                color="purple"
              />
            </Grid>
          )}
          <OutageTimelineCard
            dayStart={dayStart}
            dayEnd={dayEnd}
            outages={outages}
            probable={isYesterday ? [] : scheduled}
            now={now}
            schedule={outagesSchedule}
            charging={day == 1 ? undefined : charging}
            batteryCharge={day == 1 ? undefined : batteryHistory["sensor.pylontech_battery_id_512_charge"]}
          />
          {!isYesterday && (
            <Grid columns={2} gap="xs">
              <StateCard
                title={neededMinutes != null ? `Need ${formatDuration(neededMinutes)}` : "Battery Runtime"}
                text={runtime != null ? formatDuration(runtime) : "Calculating"}
                icon={mdiBatteryClock}
                color={runtime == null || neededMinutes == null ? undefined : runtime >= neededMinutes ? "green" : "red"}
              />
              <StateCard
                title={chargeTime != null ? "Battery Full" : "Battery Charge"}
                text={chargeTime != null ? `In ${formatDuration(chargeTime)}` : `${Math.round(Number(batteryCharge.state))}%`}
                icon={mdiBatteryChargingHigh}
                color={chargeTime == null || nextInMinutes == null || current ? undefined : chargeTime <= nextInMinutes ? "green" : "red"}
              />
            </Grid>
          )}
          <Typography.Text fontSize="sm" textColor="secondary" style={{textAlign: "center"}}>
            {isYesterday
              ? "Line above: charging · Bar: inverter · Lines under it: schedule"
              : updatedTime != null
                ? `${day == 0 ? "Line above: charging · Before now: inverter · " : ""}Schedule updated ${updatedTime >= todayStart ? formatTime(new Date(updatedTime)) : formatDateTime(updatedTime)}`
                : "Schedule update time unknown"}
          </Typography.Text>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
