import {ModalPopUp} from "@/shared/ui-kit";
import {mdiSofa} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function LivingRoomModal() {
  return (
    <QueryModalControl modal="living-room">
      <ModalPopUp.Header title="Living Room" icon={mdiSofa}/>
    </QueryModalControl>
  )
}
