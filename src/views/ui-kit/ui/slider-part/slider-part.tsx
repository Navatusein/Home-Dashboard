import {Card, Flex, Slider, Typography} from "@/shared/ui-kit";

export default function SliderPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Slider</Typography.Paragraph>

      <Card>
        <Slider max={1000}/>
      </Card>

      <Typography.Paragraph>Colored Slider</Typography.Paragraph>

      <Card>
        <Slider max={1000} color="orange"/>
      </Card>

      <Typography.Paragraph>Slider With Thumb</Typography.Paragraph>

      <Card>
        <Slider max={1000} thumb/>
      </Card>

      <Typography.Paragraph>Slider Tone</Typography.Paragraph>

      <Card color="blue">
        <Flex vertical gap="xs">
          <Slider max={1000} color="blue" tone="darker" thumb/>
          <Slider max={1000} color="blue" tone="lighter" thumb/>
        </Flex>
      </Card>

      <Typography.Paragraph>Vertical Slider</Typography.Paragraph>

      <Card style={{height: "250px", width: "100px"}}>
        <Slider max={1000} vertical/>
      </Card>
    </Flex>
  )
}
