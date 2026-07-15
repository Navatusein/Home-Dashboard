import {ModalPopUp} from "@/shared/ui-kit";
import {mdiShoePrint} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function SmallCorridorModal(props: Props) {
  return (
    <QueryModalControl modal="small-corridor">
      <ModalPopUp.Header title="Small Corridor" icon={mdiShoePrint}/>
    </QueryModalControl>
  )
}
