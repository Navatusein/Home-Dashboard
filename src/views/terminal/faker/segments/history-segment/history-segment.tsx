import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {renderText} from "../../helpers/faker-engine";
import {FakerConfig, FakerHistory, FakerProfile} from "../../types/types";

type Props = {
  config: FakerConfig;
  profile: FakerProfile;
  history?: FakerHistory;
  onSelect: (index: number) => void;
}

export default function HistorySegment(props: Props) {
  const {config, profile, history, onSelect} = props;

  return (
    <Grid.Section rowStart={7} colStart={1} direction="horizontal">
      {history?.items.map((record, index) => (
        <BaseButton
          key={index}
          title={profile.historyTitle ? renderText(profile.historyTitle, record, profile, config) : `#${index + 1}`}
          textWrap
          color={index == history.index ? "blue" : undefined}
          onClickAction={() => onSelect(index)}
        />
      ))}
    </Grid.Section>
  )
}
