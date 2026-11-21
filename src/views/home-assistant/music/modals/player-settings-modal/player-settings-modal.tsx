import {useEffect, useState} from "react";
import {Button, Flex, Input, ModalPopUp, SegmentHeader, Select, Typography} from "@/shared/ui-kit";
import {mdiAccount, mdiCellphoneCog, mdiCog, mdiKey, mdiServer, mdiWeb} from "@mdi/js";
import {useSearchParams} from "next/navigation";
import {QueryModalControl} from "@/features/query-modal-control";
import {Dashboard, NavidromeSettings} from "@/shared/native/dashboard-plugin";
import {NAVIDROME_QUALITIES} from "../../constants/music-assistant";

export default function PlayerSettingsModal() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") == "player-settings";

  const [settings, setSettings] = useState<NavidromeSettings>();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isOpen)
      return;

    Dashboard.getNavidrome()
      .then((navidrome) => {
        setSettings(navidrome);
        setPassword("");
        setStatus("");
      })
      .catch(console.error);
  }, [isOpen]);

  const save = () => {
    if (!settings)
      return;

    Dashboard.saveNavidrome({
      url: settings.url ?? "",
      username: settings.username ?? "",
      quality: settings.quality,
      ...(password && {password: password}),
    })
      .then(() => {
        setSettings({...settings, hasPassword: settings.hasPassword || !!password});
        setPassword("");
        setStatus("Saved");
      })
      .catch((error) => setStatus(String(error?.message ?? error)));
  }

  return (
    <QueryModalControl modal="player-settings">
      <ModalPopUp.Header title="Player Settings" icon={mdiCog}/>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <SegmentHeader icon={mdiServer} title="Navidrome"/>
          <Flex vertical gap="xs">
            <Input
              icon={mdiWeb}
              type="url"
              placeholder="https://navidrome.example.com"
              value={settings?.url ?? ""}
              onChange={(event) => settings && setSettings({...settings, url: event.target.value})}
            />
            <Input
              icon={mdiAccount}
              placeholder="Username"
              autoCapitalize="off"
              value={settings?.username ?? ""}
              onChange={(event) => settings && setSettings({...settings, username: event.target.value})}
            />
            <Input
              icon={mdiKey}
              type="password"
              placeholder={settings?.hasPassword ? "Saved, leave empty to keep" : "Password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Select
              items={NAVIDROME_QUALITIES}
              value={settings?.quality}
              onValueChange={(quality) => settings && setSettings({...settings, quality: quality})}
            />
            <Flex align="center" justify="space-between" gap="xs">
              <Typography.Text fontSize="sm" textColor="secondary" style={{padding: "0 4px"}}>
                {status}
              </Typography.Text>
              <Button color="purple" disabled={!settings} onClick={save}>
                Save
              </Button>
            </Flex>
          </Flex>
          <SegmentHeader icon={mdiCellphoneCog} title="App"/>
          <Button icon={mdiWeb} onClick={() => Dashboard.openSetup()}>
            Change dashboard address
          </Button>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
