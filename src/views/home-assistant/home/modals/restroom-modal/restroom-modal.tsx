import {ModalPopUp} from "@/shared/ui-kit";
import {mdiPaperRoll} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

export default function RestroomModal() {
  return (
    <QueryModalControl modal="restroom">
      <ModalPopUp.Header title="Restroom" icon={mdiPaperRoll}/>
    </QueryModalControl>
  )
}
