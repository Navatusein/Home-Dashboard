import {Flex, Grid, SegmentHeader} from "@/shared/ui-kit";
import {mdiBattery, mdiBatteryAlert, mdiShieldAccount, mdiUpdate} from "@mdi/js";
import {useHass} from "@hakit/core";
import {usePathname, useRouter} from "next/navigation";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {LOW_BATTERY_LEVEL, parseRows, selectBatteries, selectUpdates} from "../../helpers/admin-selectors";

type Props = {
  canOpenModals: boolean;
}

export default function AdminSegment(props: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const batteries = parseRows(useHass((state) => selectBatteries(state.entities)));
  const updates = parseRows(useHass((state) => selectUpdates(state.entities)));

  const lowBatteries = batteries.filter(([, , level]) => Number(level) < LOW_BATTERY_LEVEL).length;

  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiShieldAccount} title="Admin" iconColor="red"/>
      <Grid columns={2} gap="xs">
        <StateCard
          tall
          title="Batteries"
          text={lowBatteries > 0 ? `${lowBatteries} low` : `${batteries.length} OK`}
          icon={lowBatteries > 0 ? mdiBatteryAlert : mdiBattery}
          color={lowBatteries > 0 ? "red" : "green"}
          onClick={props.canOpenModals ? () => router.push(`${pathname}?modal=batteries`) : undefined}
        />
        <StateCard
          tall
          title="Updates"
          text={updates.length > 0 ? `${updates.length} available` : "Up to date"}
          icon={mdiUpdate}
          color={updates.length > 0 ? "orange" : undefined}
          onClick={props.canOpenModals ? () => router.push(`${pathname}?modal=updates`) : undefined}
        />
      </Grid>
    </Flex>
  )
}
