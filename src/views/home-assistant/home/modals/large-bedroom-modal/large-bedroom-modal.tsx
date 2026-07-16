import {ModalPopUp} from "@/shared/ui-kit";
import {mdiBedKing} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function LargeBedroomModal() {
  return (
    <QueryModalControl modal="large-bedroom">
      <ModalPopUp.Header title="Large Bedroom" icon={mdiBedKing}/>
    </QueryModalControl>
  )
}
