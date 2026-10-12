import {ValetudoMapData} from "../types/types";

const MAP_CHUNK_KEYWORD = "ValetudoMap";

export async function extractMapData(png: ArrayBuffer): Promise<ValetudoMapData> {
  const view = new DataView(png);
  const decoder = new TextDecoder("latin1");

  let offset = 8;

  while (offset < view.byteLength) {
    const length = view.getUint32(offset);
    const type = decoder.decode(new Uint8Array(png, offset + 4, 4));
    const chunk = new Uint8Array(png, offset + 8, length);
    const keywordEnd = chunk.indexOf(0);

    if (type == "zTXt" && decoder.decode(chunk.subarray(0, keywordEnd)) == MAP_CHUNK_KEYWORD) {
      const stream = new Blob([chunk.subarray(keywordEnd + 2)]).stream().pipeThrough(new DecompressionStream("deflate"));

      return new Response(stream).json();
    }

    offset += length + 12;
  }

  throw new Error("No Valetudo map data found in image");
}
