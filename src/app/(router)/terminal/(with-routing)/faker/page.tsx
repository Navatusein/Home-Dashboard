import {FakerView, loadFakerConfig} from "@/views/terminal/faker";

export default async function Page() {
  const config = await loadFakerConfig();

  return (
    <>
      <FakerView config={config}/>
    </>
  )
}
