import {ModalPopUp} from "@/shared/ui-kit";
import {mdiSilverwareForkKnife} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function KitchenModal() {
  return (
    <QueryModalControl modal="kitchen">
      <ModalPopUp.Header title="Kitchen" icon={mdiSilverwareForkKnife}/>
    </QueryModalControl>
  )
}
