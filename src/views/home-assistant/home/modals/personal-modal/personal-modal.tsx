import {ModalPopUp} from "@/shared/ui-kit";
import {mdiAccountCircle} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function PersonalModal() {
  return (
    <QueryModalControl modal="personal">
      <ModalPopUp.Header title="Personal" icon={mdiAccountCircle}/>
    </QueryModalControl>
  )
}
