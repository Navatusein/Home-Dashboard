"use client"

import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import useLocalStorage from "@/shared/hooks/use-local-storage";
import ProfileSegment from "../../segments/profile-segment/profile-segment";
import FieldsSegment from "../../segments/fields-segment/fields-segment";
import TemplatesSegment from "../../segments/templates-segment/templates-segment";
import HistorySegment from "../../segments/history-segment/history-segment";
import {generateRecord} from "../../helpers/faker-engine";
import {FakerConfig, FakerHistory} from "../../types/types";

type Props = {
  config: FakerConfig | null;
}

const PROFILE_KEY = "faker-profile";
const HISTORY_KEY = "faker-history";
const HISTORY_SIZE = 11;
const EMPTY_HISTORY: Record<string, FakerHistory> = {};

export default function FakerView(props: Props) {
  const {config} = props;

  const [profileKey, setProfileKey] = useLocalStorage<string>(PROFILE_KEY, "");
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, EMPTY_HISTORY);

  if (config == null) {
    return (
      <Grid.Section rowStart={2} colStart={1}>
        <BaseButton title="No faker config" color="red"/>
      </Grid.Section>
    )
  }

  const activeKey = profileKey in config.profiles ? profileKey : Object.keys(config.profiles)[0];
  const profile = config.profiles[activeKey];
  const activeHistory = history[activeKey];
  const record = activeHistory?.items[activeHistory.index];

  const generate = (key: string) => {
    setHistory(current => ({
      ...current,
      [key]: {
        items: [generateRecord(config.profiles[key], config), ...(current[key]?.items ?? [])].slice(0, HISTORY_SIZE),
        index: 0,
      },
    }));
  }

  const selectProfile = (key: string) => {
    setProfileKey(key);

    if (history[key] == undefined)
      generate(key);
  }

  const selectRecord = (index: number) => {
    setHistory(current => ({...current, [activeKey]: {...current[activeKey], index: index}}));
  }

  return (
    <>
      <ProfileSegment
        config={config}
        activeKey={activeKey}
        onSelect={selectProfile}
        onGenerate={() => generate(activeKey)}
      />
      <FieldsSegment
        config={config}
        profile={profile}
        record={record}
      />
      <TemplatesSegment
        config={config}
        profile={profile}
        record={record}
      />
      <HistorySegment
        config={config}
        profile={profile}
        history={activeHistory}
        onSelect={selectRecord}
      />
    </>
  )
}
