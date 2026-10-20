import {useState} from "react";
import {Flex, ModalPopUp, Segmented} from "@/shared/ui-kit";
import {mdiThermometer, mdiWaterPercent} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";
import {HistoryChartCard} from "@/widgets/home-assistant-cards/history-chart-card";

const RANGES = [
  {value: 6, text: "6h"},
  {value: 24, text: "24h"},
  {value: 72, text: "3d"},
  {value: 168, text: "7d"},
];

export default function ClimateModal() {
  const [hours, setHours] = useState(24);

  return (
    <QueryModalControl modal="climate">
      <ModalPopUp.Header title="Climate" icon={mdiThermometer}>
        <Flex justify="center">
          <Segmented options={RANGES} value={hours} onChange={setHours} color="blue"/>
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <HistoryChartCard
            title="Temperature"
            icon={mdiThermometer}
            iconColor="green"
            unit="°C"
            hours={hours}
            series={[
              {name: "Large Bedroom", entity: "sensor.large_bedroom_ih_k009_temperature", color: "purple"},
              {name: "Small Bedroom", entity: "sensor.small_bedroom_ih_k009_temperature", color: "blue"},
              {name: "Kitchen", entity: "sensor.kitchen_ih_k009_temperature", color: "orange"},
              {name: "Restroom", entity: "sensor.restroom_ts0601_temperature", color: "teal"},
            ]}
          />
          <HistoryChartCard
            title="Humidity"
            icon={mdiWaterPercent}
            iconColor="blue"
            unit="%"
            hours={hours}
            series={[
              {name: "Large Bedroom", entity: "sensor.large_bedroom_ih_k009_humidity", color: "purple"},
              {name: "Small Bedroom", entity: "sensor.small_bedroom_ih_k009_humidity", color: "blue"},
              {name: "Kitchen", entity: "sensor.kitchen_ih_k009_humidity", color: "orange"},
              {name: "Restroom", entity: "sensor.restroom_ts0601_humidity", color: "teal"},
            ]}
          />
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
