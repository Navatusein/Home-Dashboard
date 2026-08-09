import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function Page() {
  const userAgent = (await headers()).get("user-agent") || "";

  if (userAgent.includes("Quest 3")) {
    return redirect("/terminal/main");
  }
  
  return redirect(process.env.DEV_INDEX_PAGE ? "/dev" : "/home-assistant/home");
}
