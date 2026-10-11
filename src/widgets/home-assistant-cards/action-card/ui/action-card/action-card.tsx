import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {useEntity} from "@hakit/core";
import {EntityNameButton} from "@/shared/types/ha-domains";
import {useConfirm} from "@/shared/hooks/use-confirm";

type Props = {
  title: string,
  description: string,
  icon: string,
  entity: EntityNameButton,
  confirm?: boolean,
}

export default function ActionCard(props: Props) {
  const entity = useEntity(props.entity);

  const {isConfirming, confirm} = useConfirm(() => entity.service.press());

  return (
    <Card
      stackCount={1}
      padding="xs"
      clickable
      color={isConfirming ? "red" : undefined}
      onClick={() => props.confirm ? confirm() : entity.service.press()}
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
