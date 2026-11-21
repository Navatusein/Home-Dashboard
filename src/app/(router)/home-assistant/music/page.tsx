import {MusicView} from "@/views/home-assistant/music";

export default function Page() {
  return (
    <MusicView musicAssistantUrl={process.env.MUSIC_ASSISTANT_URL}/>
  )
}
