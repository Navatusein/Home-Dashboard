"use client"

import {ErrorView} from "@/views/home-assistant/error";

type Props = {
  error: unknown;
  retry: () => void;
}

export default function Error(props: Props) {
  return (
    <ErrorView error={props.error} retry={props.retry}/>
  )
}
