import {ModalPopUp} from "@/shared/ui-kit";
import {mdiPaperRoll} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function RestroomModal(props: Props) {
  return (
    <QueryModalControl modal="restroom">
      <ModalPopUp.Header title="Restroom" icon={mdiPaperRoll}/>
    </QueryModalControl>
  )
}
