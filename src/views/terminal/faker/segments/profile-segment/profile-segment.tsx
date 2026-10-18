import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {FakerConfig} from "../../types/types";
import RefreshIcon from "@public/icons/software-editors-and-uI/refresh.svg";

type Props = {
  config: FakerConfig;
  activeKey: string;
  onSelect: (key: string) => void;
  onGenerate: () => void;
}

export default function ProfileSegment(props: Props) {
  const {config, activeKey, onSelect, onGenerate} = props;

  return (
    <Grid.Section rowStart={2} colStart={1} direction="horizontal">
      <BaseButton title="Generate" icon={RefreshIcon} onClickAction={() => onGenerate()}/>
      {Object.entries(config.profiles).map(([key, item]) => (
        <BaseButton
          key={key}
          title={item.title}
          textWrap
          color={key == activeKey ? "blue" : undefined}
          onClickAction={() => onSelect(key)}
        />
      ))}
    </Grid.Section>
  )
}
