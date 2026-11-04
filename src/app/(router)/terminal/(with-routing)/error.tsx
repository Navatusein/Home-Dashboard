"use client"

import {ErrorView} from "@/views/terminal/error";

type Props = {
  retry: () => void;
}

export default function Error(props: Props) {
  return (
    <ErrorView retry={props.retry}/>
  )
}
