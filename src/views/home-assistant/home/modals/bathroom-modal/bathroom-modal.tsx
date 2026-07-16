import {ModalPopUp} from "@/shared/ui-kit";
import {mdiBathtub} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function BathroomModal() {
  return (
    <QueryModalControl modal="bathroom">
      <ModalPopUp.Header title="Bathroom" icon={mdiBathtub}/>
    </QueryModalControl>
  )
}
