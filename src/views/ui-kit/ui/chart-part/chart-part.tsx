import {Card, Chart, ChartOption, Flex, Typography} from "@/shared/ui-kit";

const OPTION: ChartOption = {
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      type: "sankey",
      left: 0,
      right: 80,
      top: 8,
      bottom: 8,
      nodeWidth: 8,
      nodeGap: 14,
      layoutIterations: 0,
      draggable: false,
      emphasis: {
        focus: "adjacency",
      },
      lineStyle: {
        color: "target",
        opacity: 0.3,
      },
      label: {
        color: "var(--color-text-primary)",
        fontSize: 14,
      },
      data: [
        {
          name: "Grid",
          itemStyle: {color: "var(--color-blue)"},
        },
        {
          name: "Home",
          itemStyle: {color: "var(--color-teal)"},
        },
        {
          name: "Desktop",
          itemStyle: {color: "var(--color-purple)"},
        },
        {
          name: "Fridge",
          itemStyle: {color: "var(--color-orange)"},
        },
        {
          name: "Other",
          itemStyle: {color: "var(--color-text-secondary)"},
        },
      ],
      links: [
        {
          source: "Grid",
          target: "Home",
          value: 420,
        },
        {
          source: "Home",
          target: "Desktop",
          value: 320,
        },
        {
          source: "Home",
          target: "Fridge",
          value: 70,
        },
        {
          source: "Home",
          target: "Other",
          value: 30,
        },
      ],
    },
  ],
}

export default function ChartPart() {
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Chart</Typography.Paragraph>

      <Card stackCount={4}>
        <Chart option={OPTION}/>
      </Card>
    </Flex>
  )
}
