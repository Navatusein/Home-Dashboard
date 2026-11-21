import {ModalPopUp} from "@/shared/ui-kit";
import {mdiDownload} from "@mdi/js";
import {usePathname, useRouter} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {DownloadsList} from "@/widgets/downloads-list";

export default function DownloadsModal() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <QueryModalControl modal="downloads">
      <ModalPopUp.Header title="Downloads" icon={mdiDownload}/>
      <ModalPopUp.Content>
        <DownloadsList onPlay={() => router.push(pathname)}/>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
