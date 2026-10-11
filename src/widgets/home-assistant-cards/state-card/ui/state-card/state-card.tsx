import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";

type Props = {
  title: string,
  text: string,
  icon: string,
  color?: ColorToken,
  tall?: boolean,
  onClick?: () => void,
}

export default function StateCard(props: Props) {
  if (props.tall) {
    return (
      <Card stackCount={2} padding="xs" color={props.color} clickable={!!props.onClick} onClick={props.onClick}>
        <Flex vertical justify="space-between" style={{height: "100%"}}>
          <Flex justify="end">
            <RoundedIcon path={props.icon}/>
          </Flex>
          <Flex vertical style={{padding: "0 4px 4px"}}>
            <Typography.Text bold>
              {props.text}
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              {props.title}
            </Typography.Text>
          </Flex>
        </Flex>
      </Card>
    )
  }

  return (
    <Card stackCount={1} padding="xs" color={props.color} clickable={!!props.onClick} onClick={props.onClick}>
      <Flex align="center" gap="xs" style={{height: "100%"}}>
        <RoundedIcon path={props.icon}/>
        <Flex vertical>
          <Typography.Text bold>
            {props.text}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary">
            {props.title}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  )
}
