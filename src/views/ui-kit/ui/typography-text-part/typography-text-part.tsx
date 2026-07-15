import {Card, Flex, Typography} from "@/shared/ui-kit";

export default function TypographyTextPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Text>Typography.Text</Typography.Text>
      <Card>
        <Flex gap="xs">
          <Typography.Text>Text</Typography.Text>
          <Typography.Text textColor="secondary">Text secondary</Typography.Text>
        </Flex>
      </Card>
    </Flex>
  )
}
