import {ModalPopUp} from "@/shared/ui-kit";
import {mdiSilverwareForkKnife} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function KitchenModal(props: Props) {
  return (
    <QueryModalControl modal="kitchen">
      <ModalPopUp.Header title="Kitchen" icon={mdiSilverwareForkKnife}/>
    </QueryModalControl>
  )
}
