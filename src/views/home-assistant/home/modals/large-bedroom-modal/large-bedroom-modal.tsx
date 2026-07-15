import {ModalPopUp} from "@/shared/ui-kit";
import {mdiBedKing} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function LargeBedroomModal(props: Props) {
  return (
    <QueryModalControl modal="large-bedroom">
      <ModalPopUp.Header title="Large Bedroom" icon={mdiBedKing}/>
    </QueryModalControl>
  )
}
