import {Button, Card, DropdownMenu, Flex, Space, Typography} from "@/shared/ui-kit";
import {
  mdiArrowRightBoldBoxOutline,
  mdiNumeric,
  mdiNumeric1Circle,
  mdiNumeric2Circle,
  mdiNumeric3Circle, mdiStateMachine
} from "@mdi/js";

export default function DropdownPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Dropdown</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <DropdownMenu
            items={[
              {key: "key-1", label: "Key 1", icon: mdiNumeric1Circle},
              {key: "key-2", label: "Key 2", icon: mdiNumeric2Circle},
              {key: "key-3", label: "Key 3", icon: mdiNumeric3Circle},
            ]}
          >
            <Button icon={mdiNumeric}>Icons</Button>
          </DropdownMenu>
          <DropdownMenu
            items={[
              {key: "key-1", label: "Key 1"},
              {key: "key-2", label: "Key 2"},
              {key: "key-3", label: "Key 3"},
            ]}
          >
            <Button>No icons</Button>
          </DropdownMenu>
          <DropdownMenu
            items={[
              {key: "key-1", label: "Selected", icon: mdiNumeric1Circle, selected: true},
              {key: "key-2", label: "Disabled", icon: mdiNumeric2Circle, disabled: true},
              {key: "key-3", label: "Default", icon: mdiNumeric3Circle},
            ]}
          >
            <Button icon={mdiStateMachine}>States</Button>
          </DropdownMenu>
          <DropdownMenu
            side="right"
            items={[
              {key: "key-1", label: "Key 1", icon: mdiNumeric1Circle},
              {key: "key-2", label: "Key 2", icon: mdiNumeric2Circle},
              {key: "key-3", label: "Key 3", icon: mdiNumeric3Circle},
            ]}
          >
            <Button icon={mdiArrowRightBoldBoxOutline}>Side right</Button>
          </DropdownMenu>
        </Space>
      </Card>
    </Flex>
  )
}