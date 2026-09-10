import {Button, Space} from "@/shared/ui-kit";
import {EntityNameClimate} from "@/shared/types/ha-domains";
import {stopGestures} from "@/shared/hooks/use-gestures";
import {mdiMinus, mdiPlus} from "@mdi/js";

type Props = {
  climateEntity: EntityNameClimate;
}

export default function ClimateAction(props: Props) {
  return (
    <Space vertical compact {...stopGestures}>
      <Button icon={mdiPlus}/>
      <Button fontSize="sm">
        20
      </Button>
      <Button icon={mdiMinus}/>
    </Space>
  )
}
