import {ColorToken} from "@/shared/constants/colors";
import {PowerFlowNode} from "../types/types";

type ValueNode = {
  title: string;
  color?: ColorToken;
  value: number;
  size: number;
  untrackedTitle?: string;
  hidden?: boolean;
  children: ValueNode[];
}

export type FlowNode = {
  key: string;
  title: string;
  color?: ColorToken;
  value: number;
  size: number;
  depth?: number;
}

export type FlowLink = {
  source: string;
  target: string;
  value: number;
}

export type Flow = {
  nodes: FlowNode[];
  links: FlowLink[];
}

const MIN_VALUE = 1;

function resolveValues(node: PowerFlowNode, values: Record<string, number>): ValueNode {
  const children = (node.children ?? [])
    .map((child) => resolveValues(child, values))
    .filter((child) => child.value >= MIN_VALUE);

  const tracked = children.reduce((total, child) => total + child.value, 0);
  const value = values[node.entity] > 0 ? values[node.entity] : tracked;

  return {title: node.title, color: node.color, value: value, size: 0, untrackedTitle: node.untrackedTitle, hidden: node.hidden, children: children};
}

function resolveSizes(node: ValueNode, size: number) {
  const tracked = node.children.reduce((total, child) => total + child.value, 0);
  const factor = tracked > size ? size / tracked : 1;
  const untracked = size - tracked * factor;

  node.size = size;

  for (const child of node.children)
    resolveSizes(child, child.value * factor);

  if (node.children.length > 0 && untracked >= MIN_VALUE)
    node.children.push({title: node.untrackedTitle ?? "Untracked", value: untracked, size: untracked, children: []});

  node.children = node.children.flatMap((child) => child.hidden ? child.children : [child]);
}

export function buildFlow(sources: PowerFlowNode[], home: PowerFlowNode, values: Record<string, number>): Flow {
  const nodes: FlowNode[] = [];
  const links: FlowLink[] = [];

  const homeValues = resolveValues(home, values);

  if (homeValues.value < MIN_VALUE)
    return {nodes: nodes, links: links};

  resolveSizes(homeValues, homeValues.value);

  const inputs = sources.map((source) => ({source: source, value: values[source.entity] || 0}));
  const activeSources = inputs.filter((input) => input.value >= MIN_VALUE);
  const sourcesTotal = activeSources.reduce((total, input) => total + input.value, 0);

  const sinks: FlowNode[] = inputs
    .filter((input) => input.value <= -MIN_VALUE)
    .map((input, index) => ({key: `sink-${index}`, title: input.source.title, color: input.source.color, value: -input.value, size: -input.value, depth: 1}));

  const targets = [{key: "home", size: homeValues.value}, ...sinks];
  const targetsTotal = targets.reduce((total, target) => total + target.size, 0);

  const loss = sourcesTotal - targetsTotal >= MIN_VALUE ? sourcesTotal - targetsTotal : 0;

  if (loss > 0)
    sinks.push({key: "loss", title: "Victron", value: loss, size: loss, depth: 1});

  const lossSourcesTotal = activeSources.reduce((total, input) => total + (input.source.coversLoss ? input.value : 0), 0);
  const coveredLoss = Math.min(lossSourcesTotal, loss);

  activeSources.forEach((input, index) => {
    const key = `source-${index}`;
    const lossShare = input.source.coversLoss
      ? coveredLoss / lossSourcesTotal
      : (loss - coveredLoss) / (sourcesTotal - lossSourcesTotal);
    const inputLoss = input.value * lossShare || 0;
    const share = (input.value - inputLoss) / (sourcesTotal - loss);

    nodes.push({key: key, title: input.source.title, color: input.source.color, value: input.value, size: targetsTotal * share + inputLoss});

    for (const target of targets)
      links.push({source: key, target: target.key, value: target.size * share});

    if (inputLoss > 0)
      links.push({source: key, target: "loss", value: inputLoss});
  });

  const flatten = (node: ValueNode, key: string) => {
    nodes.push({key: key, title: node.title, color: node.color, value: node.value, size: node.size});

    node.children.forEach((child, index) => {
      const childKey = `${key}-${index}`;

      links.push({source: key, target: childKey, value: child.size});
      flatten(child, childKey);
    });
  }

  flatten(homeValues, "home");

  if (activeSources.length > 0)
    nodes.push(...sinks);

  return {nodes: nodes, links: links};
}
