import {StatusCard} from "@/widgets/home-assistant-cards/status-card";
import {mdiFlash, mdiRobotVacuumOff, mdiThermometer, mdiWaterPercent} from "@mdi/js";
import {useEntity} from "@hakit/core";
import {usePathname, useRouter} from "next/navigation";
import {DEFAULT_WEATHER_ICON, WEATHER_ICONS} from "@/shared/constants/weather-icons";
import {BATTERY_PERCENT_CHARGING_ICONS, BATTERY_PERCENT_ICONS, BatteryPercentTokens} from "@/shared/constants/battery-percent-icons";
import {roundTextTransformer, numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";
import styles from "./status-segment.module.scss";
import {useEffect, useRef} from "react";

const BATTERY_LOW_CHARGE = 50;
const BATTERY_CRITICAL_CHARGE = 20;

const PAGE_STORAGE_KEY = "status-segment-page";

function getBatteryColor(charge: number, state: string) {
  if (charge < BATTERY_CRITICAL_CHARGE)
    return "red";

  if (charge < BATTERY_LOW_CHARGE)
    return "orange";

  return state == "discharging" ? "yellow" : "green";
}

export default function StatusSegment() {
  const pathname = usePathname();
  const router = useRouter();
  const statusRef = useRef<HTMLDivElement>(null);

  const weatherIcon = useEntity("sensor.weather_icon");
  const weatherSummary = useEntity("sensor.weather_summary");

  const batteryCharge = useEntity("sensor.pylontech_battery_id_512_charge");
  const batteryState = useEntity("sensor.gx_device_dc_battery_state");

  const weather = WEATHER_ICONS[weatherIcon.state] ?? DEFAULT_WEATHER_ICON;

  const charge = Number(batteryCharge.state) || 0;
  const batteryIcons = batteryState.state == "charging" ? BATTERY_PERCENT_CHARGING_ICONS : BATTERY_PERCENT_ICONS;

  useEffect(() => {
    const status = statusRef.current!;
    status.scrollLeft = Number(localStorage.getItem(PAGE_STORAGE_KEY)) * status.clientWidth;
  }, []);

  const savePage = () => {
    const status = statusRef.current!;
    localStorage.setItem(PAGE_STORAGE_KEY, String(Math.round(status.scrollLeft / status.clientWidth)));
  }

  return (
    <div ref={statusRef} className={styles["status"]} onScroll={savePage}>
      <StatusCard
        icon={weather.icon}
        iconColor={weather.color}
        title={weatherSummary.state}
        entity="sensor.weather_temperature"
        textTransformer={numberFixedTextTransformerProvider(1)}
      />
      <StatusCard
        icon={mdiThermometer}
        iconColor="green"
        title="Temperature"
        entity="sensor.average_temperature_home"
        textTransformer={numberFixedTextTransformerProvider(1)}
        onClick={() => router.push(`${pathname}?modal=climate`)}
      />
      <StatusCard
        icon={mdiWaterPercent}
        iconColor="blue"
        title="Humidity"
        entity="sensor.average_humidity_home"
        textTransformer={numberFixedTextTransformerProvider(1)}
        onClick={() => router.push(`${pathname}?modal=climate`)}
      />
      <StatusCard
        icon={mdiFlash}
        iconColor="yellow"
        title="Energy"
        entity="sensor.gx_device_consumption_power_l1"
        textTransformer={roundTextTransformer}
        onClick={() => router.push("/home-assistant/energy")}
      />
      <StatusCard
        icon={mdiRobotVacuumOff}
        title="Roborock"
        iconColor="secondary"
        entity="vacuum.valetudo_roborocks5"
        textTransformer={pascalCaseTextTransformer}
        onClick={() => router.push(`${pathname}?modal=vacuum`)}
      />
      <StatusCard
        icon={batteryIcons[Math.round(charge / 10) as BatteryPercentTokens]}
        iconColor={getBatteryColor(charge, batteryState.state)}
        title="Victron"
        entity="sensor.pylontech_battery_id_512_charge"
        textTransformer={roundTextTransformer}
        onClick={() => router.push("/home-assistant/energy")}
      />
    </div>
  )
}
