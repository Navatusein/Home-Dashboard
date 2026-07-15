import {ModalPopUp} from "@/shared/ui-kit";
import {mdiShoePrint} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function LargeCorridorModal(props: Props) {
  return (
    <QueryModalControl modal="large-corridor">
      <ModalPopUp.Header title="Large Corridor" icon={mdiShoePrint}/>
    </QueryModalControl>
  )
}
