import {Grid} from "@/shared/ui-kit";
import {ClipboardTextButton} from "@/widgets/terminal-buttons/clipboard-text-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {renderTemplate} from "../../helpers/faker-engine";
import {FakerConfig, FakerProfile, FakerRecord} from "../../types/types";
import BracesIcon from "@public/icons/software-editors-and-uI/braces.svg";

type Props = {
  config: FakerConfig;
  profile: FakerProfile;
  record?: FakerRecord;
}

export default function TemplatesSegment(props: Props) {
  const {config, profile, record} = props;

  return (
    <AgentDisabledProvider>
      <Grid.Section rowStart={2} colStart={12} direction="vertical">
        {Object.entries(profile.templates ?? {}).map(([label, template]) => (
          <ClipboardTextButton
            key={label}
            title={label}
            icon={BracesIcon}
            text={record ? renderTemplate(template, record, profile, config) : undefined}
          />
        ))}
      </Grid.Section>
    </AgentDisabledProvider>
  )
}
