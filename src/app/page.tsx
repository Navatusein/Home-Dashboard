import {redirect} from "next/navigation";

export default function Page() {
  return redirect(process.env.DEV_INDEX_PAGE ? "/dev" : "/home-assistant/home");
}
