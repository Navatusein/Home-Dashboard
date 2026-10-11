import {Card, Icon, Typography} from "@/shared/ui-kit";
import {useEntity} from "@hakit/core";
import {mdiBattery, mdiHome, mdiTransmissionTower} from "@mdi/js";
import {EntityNameSensor} from "@/shared/types/ha-domains";
import {roundTextTransformer} from "@/shared/text-transformers/number-text-transformer";
import DistributionNode from "../distribution-node/distribution-node";
import FlowLine from "../flow-line/flow-line";
import styles from "./energy-distribution-card.module.scss";

type Props = {
  gridPowerEntity: EntityNameSensor;
  homePowerEntity: EntityNameSensor;
  batteryChargeEntity: EntityNameSensor;
  batteryChargingPowerEntity: EntityNameSensor;
}

const FLOW_THRESHOLD = 10;

export default function EnergyDistributionCard(props: Props) {
  const gridPower = useEntity(props.gridPowerEntity);
  const homePower = useEntity(props.homePowerEntity);
  const batteryCharge = useEntity(props.batteryChargeEntity);
  const batteryPower = Number(useEntity(props.batteryChargingPowerEntity).state);

  const isCharging = batteryPower > FLOW_THRESHOLD;
  const isDischarging = batteryPower < -FLOW_THRESHOLD;

  return (
    <Card stackCount={3} padding="sm">
      <div className={styles["scene"]}>
        <svg className={styles["lines"]} width={320} height={168}>
          <FlowLine
            path="M72,30 H248"
            color="blue"
            active={Number(gridPower.state) > FLOW_THRESHOLD}
          />
          <FlowLine
            path="M72,46 H132 Q150,46 150,66"
            color="blue"
            active={isCharging}
          />
          <FlowLine
            path="M170,66 Q170,46 188,46 H248"
            color="green"
            active={isDischarging}
          />
        </svg>
        <DistributionNode title="Grid" color="blue" left={0} top={0}>
          <Icon path={mdiTransmissionTower} size="sm"/>
          <Typography.Text bold fontSize="sm">
            {roundTextTransformer(gridPower.state)}
            <Typography.Text fontSize="xs" textColor="secondary">
              {" W"}
            </Typography.Text>
          </Typography.Text>
        </DistributionNode>
        <DistributionNode title="Home" color="teal" left={244} top={0}>
          <Icon path={mdiHome} size="sm"/>
          <Typography.Text bold fontSize="sm">
            {roundTextTransformer(homePower.state)}
            <Typography.Text fontSize="xs" textColor="secondary">
              {" W"}
            </Typography.Text>
          </Typography.Text>
        </DistributionNode>
        <DistributionNode title="Battery" color="green" left={122} top={62}>
          <Icon path={mdiBattery} size="sm"/>
          <Typography.Text bold fontSize="sm">
            {roundTextTransformer(batteryCharge.state)}
            <Typography.Text fontSize="xs" textColor="secondary">
              {" %"}
            </Typography.Text>
          </Typography.Text>
          <Typography.Text fontSize="xs" textColor="secondary">
            {`${isCharging ? "↓ " : isDischarging ? "↑ " : ""}${Math.abs(Math.round(batteryPower))} W`}
          </Typography.Text>
        </DistributionNode>
      </div>
    </Card>
  )
}
