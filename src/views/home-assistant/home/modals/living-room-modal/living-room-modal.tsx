import {ModalPopUp} from "@/shared/ui-kit";
import {mdiSofa} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function LivingRoomModal(props: Props) {
  return (
    <QueryModalControl modal="living-room">
      <ModalPopUp.Header title="Living Room" icon={mdiSofa}/>
    </QueryModalControl>
  )
}
