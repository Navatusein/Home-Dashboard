import {Button, Space} from "@/shared/ui-kit";
import {EntityNameClimate} from "@/shared/types/ha-domains";
import {stopGestures} from "@/shared/hooks/use-gestures";

type Props = {
  climateEntity: EntityNameClimate;
}

export default function ClimateAction(props: Props) {
  return (
    <Space vertical compact {...stopGestures}>
      <Button>
        +
      </Button>
      <Button fontSize="sm">
        20
      </Button>
      <Button>
        -
      </Button>
    </Space>
  )
}
