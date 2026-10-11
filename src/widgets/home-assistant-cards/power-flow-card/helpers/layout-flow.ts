import {Flow} from "./build-flow";

export type FlowLayout = {
  positions: Record<string, number>;
  nodeGap: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function layoutFlow(flow: Flow, extent: number, nodeGap: number): FlowLayout {
  const children = new Map<string, string[]>();

  for (const link of flow.links)
    children.set(link.source, [...(children.get(link.source) ?? []), link.target]);

  const home = flow.nodes.find((node) => node.key == "home");

  if (!home)
    return {positions: {}, nodeGap: nodeGap};

  const values = Object.fromEntries(flow.nodes.map((node) => [node.key, node.size]));

  const sourceKeys = flow.nodes.filter((node) => children.get(node.key)?.includes(home.key)).map((node) => node.key);
  const sinkKeys = flow.nodes.filter((node) => node.depth == 1).map((node) => node.key);
  const leafKeys = flow.nodes
    .filter((node) => !children.has(node.key) && node.depth == null && node.key != home.key)
    .map((node) => node.key);

  const getTotal = (keys: string[]) => keys.reduce((sum, key) => sum + values[key], 0);

  const columns = [sourceKeys, [home.key, ...sinkKeys], leafKeys].filter((column) => column.length > 0);
  const rows = Math.max(leafKeys.length, 1) + sinkKeys.length;

  const targetScale = Math.min(
    (extent - (rows - 1) * nodeGap) / getTotal([home.key, ...sinkKeys]),
    ...columns.map((column) => (extent - (column.length - 1) * nodeGap) / getTotal(column)),
  );

  const columnGaps = columns
    .filter((column) => column.length > 1)
    .map((column) => (extent - targetScale * getTotal(column)) / (column.length - 1));

  const chartNodeGap = columnGaps.length > 0 ? Math.min(...columnGaps) : nodeGap;

  const scale = Math.min(...columns.map((column) => (extent - (column.length - 1) * chartNodeGap) / getTotal(column)));

  const heights = Object.fromEntries(flow.nodes.map((node) => [node.key, values[node.key] * scale]));
  const tops: Record<string, number> = {};

  const stack = (keys: string[], start: number) => {
    let offset = start;

    for (const key of keys) {
      tops[key] = offset;
      offset += heights[key] + nodeGap;
    }

    return offset;
  }

  const getStackHeight = (keys: string[]) => keys.reduce((sum, key) => sum + heights[key], 0) + (keys.length - 1) * nodeGap;

  const treeKeys = leafKeys.length > 0 ? leafKeys : [home.key];
  const contentHeight = getStackHeight(treeKeys) + sinkKeys.reduce((sum, key) => sum + heights[key] + nodeGap, 0);
  const contentTop = Math.max((extent - contentHeight) / 2, 0);

  const sinksTop = stack(treeKeys, contentTop);

  const place = (key: string): [number, number] => {
    const nodeChildren = children.get(key);

    if (!nodeChildren)
      return [tops[key], tops[key] + heights[key]];

    const spans = nodeChildren.map(place);
    const top = spans[0][0];
    const bottom = spans[spans.length - 1][1];

    tops[key] = (top + bottom - heights[key]) / 2;

    return [top, bottom];
  }

  if (children.has(home.key))
    place(home.key);

  stack(sinkKeys, sinksTop);

  const sourcesHeight = getStackHeight(sourceKeys);
  const targetsBottom = sinkKeys.length > 0 ? contentTop + contentHeight : tops[home.key] + heights[home.key];
  const targetsCenter = (tops[home.key] + targetsBottom) / 2;

  stack(sourceKeys, clamp(targetsCenter - sourcesHeight / 2, 0, Math.max(extent - sourcesHeight, 0)));

  return {
    positions: Object.fromEntries(Object.entries(tops).map(([key, top]) => [key, top / extent])),
    nodeGap: chartNodeGap,
  };
}
