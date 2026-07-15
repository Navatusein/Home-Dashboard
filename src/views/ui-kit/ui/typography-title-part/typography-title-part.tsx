import {Card, Flex, Typography} from "@/shared/ui-kit";

export default function TypographyTitlePart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Typography.Title</Typography.Paragraph>
      <Card>
        <Typography.Title level={1}>H1</Typography.Title>
        <Typography.Title level={2}>H2</Typography.Title>
        <Typography.Title level={3}>H3</Typography.Title>
        <Typography.Title level={4}>H4</Typography.Title>
        <Typography.Title level={5}>H5</Typography.Title>
        <Typography.Title level={6}>H6</Typography.Title>
      </Card>
    </Flex>
  )
}
