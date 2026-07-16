import {ModalPopUp} from "@/shared/ui-kit";
import {mdiBedQueen} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function SmallBedroomModal() {
  return (
    <QueryModalControl modal="small-bedroom">
      <ModalPopUp.Header title="Small Bedroom" icon={mdiBedQueen}/>
    </QueryModalControl>
  )
}
