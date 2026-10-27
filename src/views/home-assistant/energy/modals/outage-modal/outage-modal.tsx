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
import {isUnavailableState, useEntity} from "@hakit/core";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {QueryModalControl} from "@/features/query-modal-control";
import {OutageTimelineCard} from "@/widgets/home-assistant-cards/outage-timeline-card";
import {useNow} from "@/shared/hooks/use-now";
import {TimeRange, useCalendarEvents} from "@/shared/hooks/use-calendar-events";
import {useStateRanges} from "@/shared/hooks/use-state-ranges";
import {formatDuration} from "@/shared/helpers/format-duration";
import {formatTime} from "@/shared/helpers/format-time";
import {clipRanges, mergeRanges} from "@/shared/helpers/time-ranges";
import {OUTAGE_STATUS} from "../../constants/outage-status";

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

  const updatedOn = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_schedule_updated_on");
  const statusToday = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_status_today");
  const statusTomorrow = useEntity("sensor.yasno_kiiv_vul_stusa_vasilia_9_status_tomorrow");
  const batteryRuntime = useEntity("sensor.victron_battery_runtime");
  const batteryChargeTime = useEntity("sensor.victron_battery_charge_time");
  const batteryCharge = useEntity("sensor.pylontech_battery_id_512_charge");

  const todayStart = new Date(now).setHours(0, 0, 0, 0);
  const dayStart = shiftDays(todayStart, day);

  const planned = useCalendarEvents("calendar.yasno_kiiv_vul_stusa_vasilia_9_planned_outages", todayStart, shiftDays(todayStart, 2), updatedOn.state);
  const probable = useCalendarEvents("calendar.yasno_kiiv_vul_stusa_vasilia_9_probable_outages", todayStart, shiftDays(todayStart, 2), updatedOn.state);
  const actual = useStateRanges("sensor.gx_device_ac_active_input_source", "not_connected", shiftDays(todayStart, -1), now);
  const schedule = useStateRanges("sensor.yasno_kiiv_vul_stusa_vasilia_9_electricity", "outage", shiftDays(todayStart, -1), now);

  const current = planned.find(([from, to]) => from <= now && to > now);
  const next = planned.filter(([from]) => from > now).sort(([a], [b]) => a - b)[0];
  const isYesterday = day == -1;
  const status = isYesterday ? null : (day == 0 ? statusToday : statusTomorrow).state;
  const isPending = status == "waiting_for_schedule";
  const dayEnd = shiftDays(dayStart, 1);
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
            probable={isYesterday ? [] : probable}
            now={now}
            pending={isPending}
            schedule={outagesSchedule}
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
              ? "Bar: inverter · Lines under it: schedule"
              : updatedTime != null
                ? `${day == 0 ? "Before now: inverter · " : ""}Schedule updated ${updatedTime >= todayStart ? formatTime(new Date(updatedTime)) : formatDateTime(updatedTime)}`
                : "Schedule update time unknown"}
          </Typography.Text>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
