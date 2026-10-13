import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {useService} from "@hakit/core";
import {EntityNameButton, EntityNameScript} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";
import {useConfirm} from "@/shared/hooks/use-confirm";

type Props = {
  title: string,
  description: string,
  icon: string,
  entity: EntityNameButton | EntityNameScript,
  color?: ColorToken,
  confirm?: boolean,
}

export default function ActionCard(props: Props) {
  const service = useService();

  const run = () => props.entity.startsWith("button.")
    ? service("button").press({target: props.entity})
    : service("script").turnOn({target: props.entity});

  const {isConfirming, confirm} = useConfirm(run);

  return (
    <Card
      stackCount={1}
      padding="xs"
      clickable
      color={isConfirming ? "red" : props.color}
      onClick={() => props.confirm ? confirm() : run()}
    >
      <Flex align="center" gap="xs" style={{height: "100%"}}>
        <RoundedIcon path={props.icon}/>
        <Flex vertical>
          <Typography.Text>
            {props.title}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary">
            {isConfirming ? "Tap to confirm" : props.description}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  )
}
