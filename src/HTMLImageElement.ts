import { ImageData } from "./ImageData";
import { decodeBase64ToArrayBuffer } from "./Base64Utils";
import { decode } from "./PNG";
import { throwNotImplemented } from "./Utils";

const DataUriPngPrefix = "data:image/png;base64,";

interface EventHandler {
  (event: Event): void;
}

export class Image {
  public constructor(width?: number, height?: number) {
    return new HTMLImageElement(width, height);
  }
}

export class HTMLImageElement {
  /** @internal */
  private _src: string | undefined;
  /** @internal */
  private _loadHandlers: (EventHandler | null)[] = [];
  /** @internal */
  private _onloadHandler: EventHandler | undefined;
  /** @internal */
  private _errorHandlers: EventHandler[] = [];
  /** @internal */
  private __data: ImageData | undefined;

  /** @internal */
  public constructor(width?: number, height?: number) {
    if (typeof width !== "undefined" || typeof height !== "undefined") {
      throwNotImplemented();
    }
  }

  /** @internal */
  public get _data(): ImageData | undefined {
    return this.__data;
  }

  public get src(): string {
    return this._src ?? "";
  }

  public set src(value: string) {
    if (!value || typeof value !== "string") {
      throwNotImplemented();
    }

    if (value.startsWith(DataUriPngPrefix)) {
      try {
        const pngArrayBuffer = decodeBase64ToArrayBuffer(
          value.substring(DataUriPngPrefix.length)
        );
        const decoded = decode(pngArrayBuffer);
        this.__data = new ImageData(decoded.width, decoded.height);
        this.__data._data = new Uint8ClampedArray(decoded.data);
        this._raiseLoad();
      } catch (e) {
        this._raiseError();
      }
    } else {
      throwNotImplemented();
    }
  }

  public get width(): number {
    return this._data?.width ?? 0;
  }

  public get height(): number {
    return this._data?.height ?? 0;
  }

  public get naturalWidth(): number {
    return this.width;
  }

  public get naturalHeight(): number {
    return this.height;
  }

  public get complete(): boolean {
    return true;
  }

  public get onload(): EventHandler | null {
    return this._onloadHandler ?? null;
  }

  public set onload(callback: EventHandler | null | undefined) {
    this._onloadHandler = callback ?? undefined;

    // Push null as an indicator of where the onload callback should be called.
    // The first time onload is set, it maintains its position in the handlers list
    // regardless of future assignments.
    if (!this._loadHandlers.includes(null)) {
      this._loadHandlers.push(null);
    }
  }

  public addEventListener(eventName: string, handler: EventHandler): void {
    switch (eventName) {
      case "load":
        this._loadHandlers.push(handler);
        break;
      case "error":
        this._errorHandlers.push(handler);
        break;
      default:
        throwNotImplemented();
    }
  }

  public removeEventListener(eventName: string, handler: EventHandler) {
    switch (eventName) {
      case "load":
        this._loadHandlers = this._loadHandlers.filter((h) => h !== handler);
        break;
      case "error":
        this._errorHandlers = this._errorHandlers.filter((h) => h !== handler);
        break;
      default:
        throwNotImplemented();
    }
  }

  /** @internal */
  private _raiseLoad(): void {
    this._loadHandlers.forEach((callback) => {
      if (callback === null) {
        if (this._onloadHandler) {
          this._onloadHandler(new Event("load"));
        }
        return;
      } else {
        callback(new Event("load"));
      }
    });
  }

  /** @internal */
  private _raiseError(): void {
    this._errorHandlers.forEach((callback) => {
      callback(new Event("error"));
    });
  }
}
