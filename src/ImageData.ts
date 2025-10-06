import { throwInvalidArgument, throwNotImplemented } from "./Utils";

interface ImageDataSettings {
  colorSpace?: PredefinedColorSpace;
}

export type ImageDataArray = Uint8ClampedArray<ArrayBuffer>;

export class ImageData {
  /** @internal RGBA data */
  private __data: ImageDataArray;
  /** @internal */
  private _width: number;
  /** @internal */
  private _height: number;

  public constructor(width: number, height: number);
  /** @internal */
  public constructor(
    width: number,
    height: number,
    settings: ImageDataSettings
  );
  public constructor(dataArray: ImageDataArray, width: number, height: number);
  /** @internal */
  public constructor(
    dataArray: ImageDataArray,
    width: number,
    height: number,
    settings: ImageDataSettings
  );
  public constructor(
    arg1: ImageDataArray | number,
    arg2?: number,
    arg3?: number | ImageDataSettings,
    arg4?: ImageDataSettings
  ) {
    let dataArray: ImageDataArray;
    let width: number;
    let height: number;

    if (typeof arg1 === "number") {
      width = arg1;
      if (typeof arg2 !== "number") {
        throwInvalidArgument();
      }
      height = arg2;

      // Create a transparent black rectangle.
      dataArray = new Uint8ClampedArray(width * height * 4);

      if (typeof arg3 !== "undefined") {
        throwNotImplemented();
      }
    } else if (arg1 instanceof Uint8ClampedArray) {
      if (typeof arg2 !== "number") {
        throwInvalidArgument();
      }
      width = arg2;
      if (typeof arg3 !== "number") {
        // TODO: Infer
        throwInvalidArgument();
      }
      height = arg3;

      dataArray = arg1;

      if (typeof arg4 !== "undefined") {
        throwNotImplemented();
      }
    } else {
      throwInvalidArgument();
    }

    this.__data = dataArray;
    this._width = width;
    this._height = height;
  }

  public get data(): ImageDataArray {
    return this.__data;
  }

  /** @internal */
  public set _data(value: ImageDataArray) {
    this.__data = value;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get colorSpace(): PredefinedColorSpace {
    return "srgb";
  }
}
