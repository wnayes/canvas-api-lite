import { encode as upngEncode, decode as upngDecode, toRGBA8 } from "upng-js";

/** Encodes raw RGBA data into a PNG. */
export function encode(
  rawArrayBuffer: ArrayBuffer,
  width: number,
  height: number
): ArrayBuffer {
  return upngEncode([rawArrayBuffer], width, height, 0 /** lossless color */);
}

export interface IDecodedImage {
  data: ArrayBuffer;
  width: number;
  height: number;
}

/** Decodes PNG data into raw RGBA. */
export function decode(pngArrayBuffer: ArrayBuffer): IDecodedImage {
  const decoded = upngDecode(pngArrayBuffer);
  return {
    data: toRGBA8(decoded)[0],
    width: decoded.width,
    height: decoded.height,
  };
}
