import {ClipboardTextButton} from "@/widgets/terminal-buttons/clipboard-text-button";
import {AgentDisabledProvider} from "@/features/agent-disabled-provider";
import {resolveRef, stringify} from "../../helpers/faker-engine";
import {FakerButtonSpec, FakerConfig, FakerGroupSpec, FakerProfile, FakerRecord} from "../../types/types";

type Props = {
  config: FakerConfig;
  profile: FakerProfile;
  record?: FakerRecord;
}

const ROW_START = 3;
const COLUMNS = 11;

function toButton(button: FakerButtonSpec) {
  return typeof button == "string" ? {ref: button} : button;
}

function layout(groups: FakerGroupSpec[]) {
  let bandRow = ROW_START;
  let bandHeight = 0;
  let col = 1;

  return groups.flatMap(group => {
    const {span = 1, items} = typeof group == "object" && "items" in group
      ? group
      : {span: toButton(group).span, items: [group]};

    if (col + span - 1 > COLUMNS) {
      bandRow += bandHeight;
      bandHeight = 0;
      col = 1;
    }

    let row = bandRow;

    const buttons = items.map(item => {
      const {ref, display = ref, label = ref, rows = 1} = toButton(item);
      const position = {ref, display, label, span, rows, row, col};
      row += rows;
      return position;
    });

    bandHeight = Math.max(bandHeight, row - bandRow);
    col += span;

    return buttons;
  });
}

export default function FieldsSegment(props: Props) {
  const {config, profile, record} = props;

  return (
    <AgentDisabledProvider>
      {layout(profile.buttons).map(({ref, display, label, span, rows, row, col}) => {
        const value = record ? resolveRef(ref, record, profile, config) : undefined;
        const shown = record ? resolveRef(display, record, profile, config) : undefined;
        const text = value == undefined ? undefined : stringify(value);

        return (
          <ClipboardTextButton
            key={`${row}-${col}`}
            title={shown == undefined ? label : `${label}\n${stringify(shown)}`}
            text={text}
            rowStart={row}
            colStart={col}
            rowSpan={rows}
            colSpan={span}
          />
        )
      })}
    </AgentDisabledProvider>
  )
}
