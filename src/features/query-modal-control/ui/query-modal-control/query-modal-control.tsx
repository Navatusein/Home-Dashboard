"use client"

import {ReactNode} from "react";
import {ComponentProps} from "react";
import {ModalPopUp} from "@/shared/ui-kit";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Props = {
  modal: string;
  children: ReactNode;
  size?: ComponentProps<typeof ModalPopUp>["size"];
  placement?: ComponentProps<typeof ModalPopUp>["placement"];
}

export default function QueryModalControl(props: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <ModalPopUp
      size={props.size}
      placement={props.placement}
      isOpen={searchParams.get("modal") == props.modal}
      close={() => {router.push(pathname)}}
    >
      {props.children}
    </ModalPopUp>
  )
}
