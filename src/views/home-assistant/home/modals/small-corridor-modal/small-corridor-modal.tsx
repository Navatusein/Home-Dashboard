import {ModalPopUp} from "@/shared/ui-kit";
import {mdiShoePrint} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function SmallCorridorModal() {
  return (
    <QueryModalControl modal="small-corridor">
      <ModalPopUp.Header title="Small Corridor" icon={mdiShoePrint}/>
    </QueryModalControl>
  )
}
