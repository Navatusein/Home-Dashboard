import {useEffect, useRef, useState} from "react";
import {Card, Chart, ChartOption} from "@/shared/ui-kit";
import {useHass} from "@hakit/core";
import {ColorToken} from "@/shared/constants/colors";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {PowerFlowNode} from "../../types/types";
import {buildFlow, FlowLink} from "../../helpers/build-flow";
import {layoutFlow} from "../../helpers/layout-flow";

type Props = {
  sources: PowerFlowNode[];
  home: PowerFlowNode;
}

const NODE_GAP = 12;

const HORIZONTAL_AREA = {left: 0, right: 150, top: 16, bottom: 16};
const VERTICAL_AREA = {left: 8, right: 8, top: 8, bottom: 160};

const PARENT_LABEL = {
  backgroundColor: "var(--color-secondary)",
  padding: [5, 10],
  borderRadius: 12,
}

const VERTICAL_PARENT_LABEL = {
  ...PARENT_LABEL,
  position: "bottom" as const,
  distance: 8,
}

const VERTICAL_LEAF_LABEL = {
  position: "bottom" as const,
  rotate: -90,
  align: "left" as const,
  verticalAlign: "middle" as const,
  distance: 6,
}

function collectEntities(node: PowerFlowNode): string[] {
  return [node.entity, ...(node.children ?? []).flatMap(collectEntities)];
}

function getColor(color?: ColorToken) {
  return color ? `var(--color-${color})` : "var(--color-text-secondary)";
}

export default function PowerFlowCard(props: Props) {
  const isVertical = useBreakpoint("sm");

  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!cardRef.current)
      return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({width: entry.contentRect.width, height: entry.contentRect.height});
    });
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const entities = [...props.sources, props.home].flatMap(collectEntities);
  const states = useHass((state) => entities.map((entity) => state.entities[entity]?.state).join("\n")).split("\n");

  const values = Object.fromEntries(entities.map((entity, index) => [entity, Number(states[index])]));
  const flow = buildFlow(props.sources, props.home, values);
  const nodes = Object.fromEntries(flow.nodes.map((node) => [node.key, node]));
  const parents = new Set(flow.links.map((link) => link.source));

  const area = isVertical ? VERTICAL_AREA : HORIZONTAL_AREA;
  const extent = isVertical ? size.width - area.left - area.right : size.height - area.top - area.bottom;
  const layout = extent > 0 ? layoutFlow(flow, extent, NODE_GAP) : null;

  const option: ChartOption = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const item = Array.isArray(params) ? params[0] : params;

        if (item.dataType == "edge") {
          const link = item.data as FlowLink;

          return `${nodes[link.source]?.title} → ${nodes[link.target]?.title}: <b>${Math.round(link.value)} W</b>`;
        }

        return `${nodes[item.name]?.title}: <b>${Math.round(nodes[item.name]?.value)} W</b>`;
      },
    },
    series: [
      {
        type: "sankey",
        ...area,
        orient: isVertical ? "vertical" : "horizontal",
        nodeWidth: 8,
        nodeGap: layout?.nodeGap,
        nodeAlign: "justify",
        layoutIterations: 0,
        draggable: false,
        animationDuration: 250,
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: "target",
          opacity: 0.3,
          curveness: 0.5,
        },
        label: {
          color: "var(--color-text-primary)",
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 16,
          formatter: (params) => `${nodes[params.name]?.title}${parents.has(params.name) ? "\n" : " "}{value|${Math.round(nodes[params.name]?.value)} W}`,
          rich: {
            value: {
              color: "var(--color-text-primary)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 14,
            },
          },
        },
        data: (layout ? flow.nodes : []).map((node) => ({
          name: node.key,
          depth: node.depth,
          localX: isVertical ? layout?.positions[node.key] : undefined,
          localY: isVertical ? undefined : layout?.positions[node.key],
          itemStyle: {
            color: getColor(node.color),
            borderWidth: 0,
            borderRadius: 4,
          },
          label: parents.has(node.key)
            ? (isVertical ? VERTICAL_PARENT_LABEL : PARENT_LABEL)
            : (isVertical ? VERTICAL_LEAF_LABEL : undefined),
        })),
        links: layout ? flow.links : [],
      },
    ],
  }

  return (
    <Card ref={cardRef} stackCount={isVertical ? 8 : 5} padding="sm">
      {layout && <Chart option={option}/>}
    </Card>
  )
}
