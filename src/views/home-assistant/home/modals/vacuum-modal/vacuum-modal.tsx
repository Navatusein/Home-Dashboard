import {Card, Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiAirFilter,
  mdiBroom,
  mdiChartBar,
  mdiFan,
  mdiHomeImportOutline,
  mdiMapMarkerRadius,
  mdiMotionSensor,
  mdiPause,
  mdiPlay,
  mdiRemote,
  mdiRobotVacuum,
  mdiTextureBox,
  mdiTimerOutline,
  mdiWrench
} from "@mdi/js";
import {useState} from "react";
import {useEntity} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {ValetudoMap} from "@/features/valetudo-map";
import {Chips} from "@/shared/ui-kit/chips";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {BATTERY_PERCENT_ICONS, BatteryPercentTokens} from "@/shared/constants/battery-percent-icons";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";
import {numberDividedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";

const SEGMENT_AREAS: Record<string, string> = {
  "16": "large_corridor",
  "17": "living_room",
  "18": "kitchen",
  "19": "small_corridor",
  "20": "small_bedroom",
  "21": "large_bedroom"
};

const minutesToHoursTextTransformer = numberDividedTextTransformerProvider(60);

export default function VacuumModal() {
  const vacuum = useEntity("vacuum.valetudo_roborocks5");
  const battery = useEntity("sensor.valetudo_roborocks5_battery_level");
  const segments = useEntity("sensor.valetudo_roborocks5_map_segments");

  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const isCleaning = vacuum.state == "cleaning";
  const isReturning = vacuum.state == "returning";

  const fanSpeeds = vacuum.attributes.fan_speed_list as string[];
  const fanSpeed = vacuum.attributes.fan_speed as string;

  const nextFanSpeed = () => {
    vacuum.service.setFanSpeed({serviceData: {fan_speed: fanSpeeds[(fanSpeeds.indexOf(fanSpeed) + 1) % fanSpeeds.length]}});
  }

  const toggleSegment = (segmentId: string) => {
    setSelectedSegments(selectedSegments.includes(segmentId)
      ? selectedSegments.filter((id) => id != segmentId)
      : [...selectedSegments, segmentId]);
  }

  const start = () => {
    if (selectedSegments.length == 0)
      return vacuum.service.start();

    vacuum.service.cleanArea({serviceData: {cleaning_area_id: selectedSegments.map((id) => SEGMENT_AREAS[id])}});

    setSelectedSegments([]);
  }

  const cleaningTitle = selectedSegments.length == 1
    ? segments.attributes[selectedSegments[0]]
    : `${selectedSegments.length} rooms`;

  return (
    <QueryModalControl modal="vacuum">
      <ModalPopUp.Header title="Roborock" icon={mdiRobotVacuum}>
        <Flex justify="center" gap="xs">
          <Chips
            text={pascalCaseTextTransformer(vacuum.state)}
            icon={mdiRobotVacuum}
            iconColor="blue"
          />
          <Chips
            text={`${battery.state} %`}
            icon={BATTERY_PERCENT_ICONS[Math.round((Number(battery.state) || 0) / 10) as BatteryPercentTokens]}
            iconColor="green"
          />
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <Card padding="xs">
            <ValetudoMap
              entity="camera.valetudo_roborocks5_map_data"
              selectedSegments={selectedSegments}
              onSegmentClick={toggleSegment}
            />
          </Card>
          <SegmentHeader icon={mdiRemote} title="Control" iconColor="blue"/>
          <Grid columns={2} gap="xs">
            <Grid.Element rowSpan={2}>
              <StateCard
                tall
                title={selectedSegments.length == 0 ? "Full cleaning" : cleaningTitle}
                text={isCleaning ? "Pause" : "Start"}
                icon={isCleaning ? mdiPause : mdiPlay}
                color={isCleaning ? "green" : undefined}
                onClick={() => isCleaning ? vacuum.service.pause() : start()}
              />
            </Grid.Element>
            <StateCard
              title="To dock"
              text="Return"
              icon={mdiHomeImportOutline}
              color={isReturning ? "orange" : undefined}
              onClick={() => vacuum.service.returnToBase()}
            />
            <Grid.Element rowSpan={2}>
              <StateCard
                tall
                title="Fan speed"
                text={pascalCaseTextTransformer(fanSpeed)}
                icon={mdiFan}
                color={fanSpeed == "off" ? undefined : "teal"}
                onClick={nextFanSpeed}
              />
            </Grid.Element>
            <StateCard
              title="Play sound"
              text="Locate"
              icon={mdiMapMarkerRadius}
              onClick={() => vacuum.service.locate()}
            />
          </Grid>
          <SegmentHeader icon={mdiChartBar} title="Statistics" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <EntityStateCard
              title="Area"
              icon={mdiTextureBox}
              entity="sensor.valetudo_roborocks5_current_statistics_area"
              textTransformer={numberDividedTextTransformerProvider(10000, 1)}
              unit="m²"
            />
            <EntityStateCard
              title="Time"
              icon={mdiTimerOutline}
              entity="sensor.valetudo_roborocks5_current_statistics_time"
              textTransformer={numberDividedTextTransformerProvider(60)}
              unit="min"
            />
          </Grid>
          <SegmentHeader icon={mdiWrench} title="Consumables" iconColor="orange"/>
          <Grid columns={2} gap="xs">
            <EntityStateCard
              title="Main brush"
              icon={mdiBroom}
              entity="sensor.valetudo_roborocks5_main_brush"
              textTransformer={minutesToHoursTextTransformer}
              unit="h"
            />
            <EntityStateCard
              title="Side brush"
              icon={mdiBroom}
              entity="sensor.valetudo_roborocks5_right_brush"
              textTransformer={minutesToHoursTextTransformer}
              unit="h"
            />
            <EntityStateCard
              title="Filter"
              icon={mdiAirFilter}
              entity="sensor.valetudo_roborocks5_main_filter"
              textTransformer={minutesToHoursTextTransformer}
              unit="h"
            />
            <EntityStateCard
              title="Sensors"
              icon={mdiMotionSensor}
              entity="sensor.valetudo_roborocks5_sensor_cleaning"
              textTransformer={minutesToHoursTextTransformer}
              unit="h"
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
