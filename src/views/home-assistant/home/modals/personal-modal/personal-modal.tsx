import {ModalPopUp} from "@/shared/ui-kit";
import {mdiAccountCircle} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function PersonalModal(props: Props) {
  return (
    <QueryModalControl modal="personal">
      <ModalPopUp.Header title="Personal" icon={mdiAccountCircle}/>
    </QueryModalControl>
  )
}
