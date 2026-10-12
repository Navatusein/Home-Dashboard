"use client"

import {ComponentProps, TouchEvent, useEffect, useRef} from "react";
import {cva} from "class-variance-authority";
import {ComposeOption, EChartsType, init, use as registerComponents} from "echarts/core";
import {SankeyChart, SankeySeriesOption} from "echarts/charts";
import {TooltipComponent, TooltipComponentOption} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {resolveCssVariables} from "../../helpers/resolve-css-variables";
import styles from "./chart.module.scss";

registerComponents([SankeyChart, TooltipComponent, CanvasRenderer]);

export type ChartOption = ComposeOption<SankeySeriesOption | TooltipComponentOption>;

const BASE_OPTION: ChartOption = {
  stateAnimation: {
    duration: 0,
  },
  tooltip: {
    confine: true,
    backgroundColor: "var(--color-primary)",
    borderWidth: 0,
    padding: [8, 12],
    extraCssText: "border-radius: 12px; box-shadow: none;",
    textStyle: {
      color: "var(--color-text-primary)",
      fontSize: 14,
    },
  },
}

const variants = cva(
  styles["base"],
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = ComponentProps<"div"> & {
  option: ChartOption;
}

export default function Chart(props: Props) {
  const {className, option, ...otherProps} = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>(null);
  const optionRef = useRef<ChartOption>(null);
  const highlightRef = useRef<{seriesIndex?: number, dataType?: string, name: string}>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container)
      return;

    const chart = init(container);
    chartRef.current = chart;

    const apply = () => {
      const style = getComputedStyle(container);

      chart.setOption({textStyle: {fontFamily: style.fontFamily}});
      chart.setOption(resolveCssVariables(BASE_OPTION, style));

      if (optionRef.current)
        chart.setOption(resolveCssVariables(optionRef.current, style));
    }

    apply();

    chart.on("mouseover", (params) => {
      highlightRef.current = {seriesIndex: params.seriesIndex, dataType: params.dataType, name: params.name};
    });
    chart.on("mouseout", () => {
      if (highlightRef.current)
        chart.dispatchAction({type: "downplay", ...highlightRef.current});

      highlightRef.current = null;
    });

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(apply);
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ["data-color-theme"]});

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      chart.dispose();
      chartRef.current = null;
    }
  }, []);

  useEffect(() => {
    optionRef.current = option;

    if (!containerRef.current || !chartRef.current)
      return;

    chartRef.current.setOption(resolveCssVariables(option, getComputedStyle(containerRef.current)));

    if (highlightRef.current)
      chartRef.current.dispatchAction({type: "highlight", ...highlightRef.current});
  }, [option]);

  const stopTouch = (event: TouchEvent) => event.stopPropagation();

  return (
    <div
      ref={containerRef}
      data-slot="chart"
      className={variants({
        className: className
      })}
      onTouchStartCapture={stopTouch}
      onTouchMoveCapture={stopTouch}
      onTouchEndCapture={stopTouch}
      {...otherProps}
    />
  )
}
