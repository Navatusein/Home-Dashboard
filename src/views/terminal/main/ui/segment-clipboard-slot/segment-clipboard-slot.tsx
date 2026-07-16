import {Grid} from "@/shared/ui-kit";
import {ClipboardSlotButton} from "@/widgets/terminal-buttons/clipboard-slot-button";

export default function ClipboardSlotSegment() {
  return (
    <>
      <Grid.Section rowStart={3} colStart={7} direction="horizontal">
        <ClipboardSlotButton slotIndex={1}/>
        <ClipboardSlotButton slotIndex={2}/>
      </Grid.Section>
      <Grid.Section rowStart={4} colStart={7} direction="horizontal">
        <ClipboardSlotButton slotIndex={3}/>
        <ClipboardSlotButton slotIndex={4}/>
      </Grid.Section>
    </>
  )
}
