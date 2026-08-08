import {Flex, ResponsiveToggler} from "@/shared/ui-kit";
import {StatusCard} from "@/widgets/home-assistant-cards/status-card";
import {mdiFlash, mdiRobotVacuumOff, mdiThermometer, mdiWaterPercent, mdiWeatherSunny} from "@mdi/js";
import {roundTextTransformer, numberFixedTextTransformerProvider} from "@/shared/text-transformers/number-text-transformer";
import {pascalCaseTextTransformer} from "@/shared/text-transformers/case-text-transformer";

export default function StatusSegment() {
  return (
    <ResponsiveToggler breakpoint="sm" hide>
      <Flex justify="space-around">
        <StatusCard
          icon={mdiWeatherSunny}
          iconColor="yellow"
          title="Sunny"
          entity="sensor.weather_temperature"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <StatusCard
          icon={mdiThermometer}
          iconColor="green"
          title="Temperature"
          entity="sensor.kitchen_ih_k009_temperature"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <StatusCard
          icon={mdiWaterPercent}
          iconColor="blue"
          title="Humidity"
          entity="sensor.kitchen_ih_k009_humidity"
          textTransformer={numberFixedTextTransformerProvider(1)}
        />
        <StatusCard
          icon={mdiFlash}
          iconColor="yellow"
          title="Energy"
          entity="sensor.multiplus_ii_48_4k5_55_32_id_276_0_line_1_input_power"
          textTransformer={roundTextTransformer}
        />
        <StatusCard
          icon={mdiRobotVacuumOff}
          title="Roborock"
          iconColor="secondary"
          entity="vacuum.valetudo_roborocks5"
          textTransformer={pascalCaseTextTransformer}
        />
      </Flex>
    </ResponsiveToggler>
  )
}
