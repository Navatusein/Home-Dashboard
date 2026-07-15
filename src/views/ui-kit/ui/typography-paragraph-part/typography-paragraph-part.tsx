import {Card, Flex, Typography} from "@/shared/ui-kit";

export default function TypographyParagraphPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Typography.Paragraph</Typography.Paragraph>
      <Card>
        <Typography.Paragraph>Paragraph</Typography.Paragraph>
        <Typography.Paragraph textColor="secondary">Paragraph secondary</Typography.Paragraph>
      </Card>
    </Flex>
  )
}
