import {Grid} from "@/shared/ui-kit";
import {ReactNode} from "react";

type Props = {
  children: ReactNode;
}

const COLUMNS = 12;
const ROWS = 7;

export default function TerminalLayout(props: Props) {
  return (
    // backgroundColor: "#282828"
    <div style={{width: "100%", height: "100svh", padding: "5px", backgroundColor: "#282828"}} >
      <Grid columns={COLUMNS} rows={ROWS} gap="xxs" style={{height: "100%"}}>
        {props.children}
      </Grid>
    </div>
  )
}
