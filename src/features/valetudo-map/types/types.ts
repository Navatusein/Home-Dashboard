export type ValetudoMapLayer = {
  type: "floor" | "segment" | "wall";
  metaData: {
    segmentId?: string;
    name?: string;
    active?: boolean;
  };
  compressedPixels: number[];
  dimensions: {
    x: {min: number, max: number, avg: number};
    y: {min: number, max: number, avg: number};
  };
}

export type ValetudoMapEntity = {
  type: string;
  metaData: {
    angle?: number;
  };
  points: number[];
}

export type ValetudoMapData = {
  pixelSize: number;
  layers: ValetudoMapLayer[];
  entities: ValetudoMapEntity[];
}
