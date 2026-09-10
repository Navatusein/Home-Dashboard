import {Card, Flex, Select, Space, Typography} from "@/shared/ui-kit";
import {mdiNumeric1Circle, mdiNumeric2Circle, mdiNumeric3Circle} from "@mdi/js";

export default function SelectPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Select</Typography.Paragraph>
      <Card>
        <Space gap="sm" wrap>
          <Select
            items={[
              {key: "key-1", label: "Key 1", value: "value-1"},
              {key: "key-2", label: "Key 2", value: "value-2"},
              {key: "key-3", label: "Key 3", value: "value-3"},
            ]}
          />
          <Select
            items={[
              {key: "key-1", label: "Key 1", value: "value-1", icon: mdiNumeric1Circle},
              {key: "key-2", label: "Key 2", value: "value-2", icon: mdiNumeric2Circle},
              {key: "key-3", label: "Key 3", value: "value-3", icon: mdiNumeric3Circle},
            ]}
            compact={true}
            iconOnly={true}
            placeholderIcon={mdiNumeric1Circle}
          />
          <Select
            items={[
              {key: "key-1", label: "Key 1", value: "value-1", icon: mdiNumeric1Circle},
              {key: "key-2", label: "Key 2", value: "value-2", icon: mdiNumeric2Circle},
              {key: "key-3", label: "Key 3", value: "value-3", icon: mdiNumeric3Circle},
            ]}
            placeholderIcon={mdiNumeric1Circle}
            placeholder="Please select a value"
          />
          <Select
            defaultValue="value-1"
            items={[
              {key: "key-1", label: "Default", value: "value-1"},
              {key: "key-2", label: "Disabled", value: "value-2", disabled: true},
              {key: "key-3", label: "Key 3", value: "value-3"},
            ]}
          />
          <Select
            items={[
              {key: "key-1", label: "Key 1", value: "value-1", icon: mdiNumeric1Circle},
              {key: "key-2", label: "Key 2", value: "value-2", icon: mdiNumeric2Circle},
              {key: "key-3", label: "Key 3", value: "value-3", icon: mdiNumeric3Circle},
            ]}
            compact={true}
            iconOnly={true}
            placeholderIcon={mdiNumeric1Circle}
            shape="round"
          />
        </Space>
      </Card>
    </Flex>
  )
}