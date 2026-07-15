import {Card, Flex, Typography} from "@/shared/ui-kit";

export default function CardClickablePart() {
  return (
    <Flex vertical gap="sm">
        <Typography.Paragraph>Card Clickable</Typography.Paragraph>
        <Flex gap="sm">
          <Card style={{width: "100%"}} clickable>
            <Typography.Paragraph>1</Typography.Paragraph>
            <Typography.Paragraph textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="purple">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="yellow">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="orange">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="red">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="green">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="blue">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="teal">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
          <Card style={{width: "100%"}} clickable color="pink">
            <Typography.Paragraph colorScheme="dark">1</Typography.Paragraph>
            <Typography.Paragraph colorScheme="dark" textColor="secondary">1</Typography.Paragraph>
          </Card>
        </Flex>
      </Flex>
  )
}
