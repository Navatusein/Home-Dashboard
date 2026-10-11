import {Card, Flex, RoundedIcon, Switch, Typography} from "@/shared/ui-kit";
import {isOffState, isUnavailableState, useEntity} from "@hakit/core";
import {EntityNameSwitch} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";
import {useConfirm} from "@/shared/hooks/use-confirm";

type Props = {
  title: string,
  icon: string,
  entity: EntityNameSwitch,
  color?: ColorToken,
  confirmOn?: boolean,
  confirmOff?: boolean,
  tall?: boolean,
}

export default function SwitchCard(props: Props) {
  const entity = useEntity(props.entity);

  const isUnavailable = isUnavailableState(entity.state);
  const isOn = !isOffState(entity.state);

  const toggleEntity = () => isOn ? entity.service.turnOff() : entity.service.turnOn();

  const {isConfirming, confirm} = useConfirm(toggleEntity);

  const toggle = () => {
    if (isUnavailable)
      return;

    if (isOn ? props.confirmOff : props.confirmOn)
      confirm();
    else
      toggleEntity();
  }

  if (props.tall) {
    return (
      <Card
        stackCount={2}
        padding="xs"
        clickable
        color={isConfirming ? "red" : (isOn ? props.color : undefined)}
        onClick={toggle}
      >
        <Flex vertical justify="space-between" style={{height: "100%"}}>
          <Flex align="center" justify="space-between">
            <RoundedIcon path={props.icon}/>
            <Switch checked={isOn} disabled={isUnavailable} color={props.color} tone={props.color ? "darker" : undefined}/>
          </Flex>
          <Flex vertical style={{padding: "0 4px 4px"}}>
            <Typography.Text bold>
              {isUnavailable ? "--" : (isOn ? "On" : "Off")}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {isConfirming ? "Tap to confirm" : props.title}
            </Typography.Text>
          </Flex>
        </Flex>
      </Card>
    )
  }

  return (
    <Card
      stackCount={1}
      padding="xs"
      clickable
      color={isConfirming ? "red" : (isOn ? props.color : undefined)}
      onClick={toggle}
    >
      <Flex align="center" justify="space-between" gap="xs" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={props.icon}/>
          <Flex vertical>
            <Typography.Text bold>
              {isUnavailable ? "--" : (isOn ? "On" : "Off")}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {isConfirming ? "Tap to confirm" : props.title}
            </Typography.Text>
          </Flex>
        </Flex>
        <Switch checked={isOn} disabled={isUnavailable} color={props.color} tone={props.color ? "darker" : undefined}/>
      </Flex>
    </Card>
  )
}
