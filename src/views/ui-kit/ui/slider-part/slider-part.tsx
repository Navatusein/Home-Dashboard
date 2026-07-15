import {Card, Flex, Slider, Typography} from "@/shared/ui-kit";

export default function SliderPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Slider</Typography.Paragraph>

      <Card>
        <Slider max={1000}/>
      </Card>

      <Typography.Paragraph>Vertical Slider</Typography.Paragraph>

      <Card style={{height: "250px", width: "100px"}}>
        <Slider max={1000} vertical/>
      </Card>
    </Flex>
  )
}
