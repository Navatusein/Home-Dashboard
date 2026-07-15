import {ReactNode} from "react";
import {TerminalLayout} from "@/app/layouts/terminal-layout";

type Props = {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <TerminalLayout>
      {props.children}
    </TerminalLayout>
  )
}