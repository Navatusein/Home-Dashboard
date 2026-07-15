import {ReactNode, StrictMode} from "react";
import {HomeAssistantConnect} from "@/app/layouts/home-assistant-connect";

type Props = {
  children: ReactNode;
}

export default function BaseLayout(props: Props) {
  return (
    <HomeAssistantConnect homeAssistantUrl={process.env.HOME_ASSISTANT_URL}>
      <StrictMode>
        {props.children}
      </StrictMode>
    </HomeAssistantConnect>
  );
}