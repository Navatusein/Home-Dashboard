import {Flex, Grid, ModalPopUp} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {mdiBattery, mdiBatteryAlert} from "@mdi/js";
import {useHass} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {EntityStateCard} from "@/widgets/home-assistant-cards/entity-state-card";
import {EntityNameSensor} from "@/shared/types/ha-domains";
import {BATTERY_PERCENT_ICONS, BatteryPercentTokens} from "@/shared/constants/battery-percent-icons";
import {LOW_BATTERY_LEVEL, MEDIUM_BATTERY_LEVEL, parseRows, selectBatteries} from "../../helpers/admin-selectors";

function getLevelColor(level: number) {
  if (level < LOW_BATTERY_LEVEL)
    return "red";

  if (level < MEDIUM_BATTERY_LEVEL)
    return "yellow";

  return "green";
}

export default function BatteriesModal() {
  const batteries = parseRows(useHass((state) => selectBatteries(state.entities)));

  const lowBatteries = batteries.filter(([, , level]) => Number(level) < LOW_BATTERY_LEVEL).length;

  return (
    <QueryModalControl modal="batteries">
      <ModalPopUp.Header title="Batteries" icon={mdiBattery}>
        <Flex justify="center" gap="xs">
          <Chips
            text={`${batteries.length} devices`}
            icon={mdiBattery}
            iconColor="green"
          />
          <Chips
            text={`${lowBatteries} low`}
            icon={mdiBatteryAlert}
            iconColor={lowBatteries > 0 ? "red" : "green"}
          />
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Grid columns={2} gap="xs">
          {batteries.map(([entityId, name, level]) => (
            <EntityStateCard
              key={entityId}
              title={name}
              icon={BATTERY_PERCENT_ICONS[Math.round((Number(level) || 0) / 10) as BatteryPercentTokens]}
              iconColor={Number.isNaN(Number(level)) ? undefined : getLevelColor(Number(level))}
              entity={entityId as EntityNameSensor}
            />
          ))}
        </Grid>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
