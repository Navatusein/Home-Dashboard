import {ModalPopUp} from "@/shared/ui-kit";
import {mdiShoePrint} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function LargeCorridorModal() {
  return (
    <QueryModalControl modal="large-corridor">
      <ModalPopUp.Header title="Large Corridor" icon={mdiShoePrint}/>
    </QueryModalControl>
  )
}
