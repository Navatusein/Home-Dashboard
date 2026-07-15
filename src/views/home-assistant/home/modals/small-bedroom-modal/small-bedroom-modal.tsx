import {ModalPopUp} from "@/shared/ui-kit";
import {mdiBedQueen} from "@mdi/js";
import {QueryModalControl} from "@/features/query-modal-control";

type Props = {}

export default function SmallBedroomModal(props: Props) {
  return (
    <QueryModalControl modal="small-bedroom">
      <ModalPopUp.Header title="Small Bedroom" icon={mdiBedQueen}/>
    </QueryModalControl>
  )
}
