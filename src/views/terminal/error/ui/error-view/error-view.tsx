"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import AlertTriangleIcon from "@public/icons/misc/alert-triangle.svg";
import ReloadIcon from "@public/icons/devices-and-networks/reload.svg";

type Props = {
  retry: () => void;
}

export default function ErrorView(props: Props) {
  return (
    <Grid.Section rowStart={2}>
      <BaseButton title="Error" icon={AlertTriangleIcon} color="red"/>
      <BaseButton title="Retry" icon={ReloadIcon} onClickAction={props.retry}/>
    </Grid.Section>
  )
}
