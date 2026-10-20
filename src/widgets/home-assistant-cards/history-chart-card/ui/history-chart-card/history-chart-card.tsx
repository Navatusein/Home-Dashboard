import {useState} from "react";
import {time} from "echarts/core";
import {Card, Chart, ChartOption, Flex, Grid, RoundedIcon, Typography} from "@/shared/ui-kit";
import {ColorToken} from "@/shared/constants/colors";
import {useHistoryStates} from "@/shared/hooks/use-history-states";
import {HistoryChartSeries} from "../../types/types";
import HistoryChartChip from "../history-chart-chip/history-chart-chip";
import {alignHistory} from "../../helpers/align-history";

type Props = {
  title: string,
  icon: string,
  iconColor?: ColorToken,
  unit: string,
  series: HistoryChartSeries[],
  hours?: number,
}

export default function HistoryChartCard(props: Props) {
  const hours = props.hours ?? 24;
  const history = useHistoryStates(props.series.map((series) => series.entity), hours);
  const [hidden, setHidden] = useState<string[]>([]);

  const toggle = (entity: string) => {
    setHidden(hidden.includes(entity) ? hidden.filter((item) => item != entity) : [...hidden, entity]);
  }

  const solo = (entity: string) => {
    const others = props.series.map((series) => series.entity).filter((item) => item != entity);
    const isSolo = others.every((item) => hidden.includes(item)) && !hidden.includes(entity);

    setHidden(isSolo ? [] : others);
  }

  const data = alignHistory(props.series.map((series) => hidden.includes(series.entity) ? [] : history[series.entity] ?? []));

  const option: ChartOption = {
    grid: {
      top: 8,
      left: 0,
      right: 8,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => typeof value == "number" ? `${value.toFixed(1)} ${props.unit}` : "--",
    },
    xAxis: {
      type: "time",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "var(--color-text-secondary)",
        formatter: hours > 24 ? "{dd}.{MM}" : "{HH}:{mm}",
      },
      axisPointer: {
        label: {
          formatter: ({value}) => time.format(value, "{dd}.{MM} {HH}:{mm}", false),
        },
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLabel: {
        color: "var(--color-text-secondary)",
      },
      splitLine: {
        lineStyle: {
          color: "var(--color-secondary)",
        },
      },
    },
    series: props.series.map((series, index) => ({
      type: "line",
      name: series.name,
      data: hidden.includes(series.entity) ? [] : data[index],
      step: "end",
      showSymbol: false,
      color: `var(--color-${series.color})`,
      lineStyle: {
        width: 2,
      },
    })),
  };

  return (
    <Card stackCount={6} padding="sm">
      <Flex vertical gap="xs" style={{height: "100%"}}>
        <Flex align="center" gap="xs">
          <RoundedIcon path={props.icon} iconColor={props.iconColor}/>
          <Typography.Text bold>
            {props.title}
          </Typography.Text>
        </Flex>
        <Flex grow style={{minHeight: 0}}>
          <Chart option={option}/>
        </Flex>
        <Grid columns={2} gap="xs">
          {props.series.map((series) => (
            <HistoryChartChip
              key={series.entity}
              series={series}
              hidden={hidden.includes(series.entity)}
              onToggle={() => toggle(series.entity)}
              onSolo={() => solo(series.entity)}
            />
          ))}
        </Grid>
      </Flex>
    </Card>
  )
}
