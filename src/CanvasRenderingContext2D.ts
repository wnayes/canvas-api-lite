import {
  CSSColorStringToRGBAArray,
  RGBAArray,
  RGBAArrayToCSSColorString,
  TransparentRGBAArray,
} from "./Colors";
import { HTMLCanvasElement } from "./HTMLCanvasElement";
import { HTMLImageElement } from "./HTMLImageElement";
import { ImageData } from "./ImageData";
import {
  BytesPerPixel,
  throwInvalidArgument,
  throwNotImplemented,
} from "./Utils";

type CanvasImageSource = HTMLCanvasElement | HTMLImageElement;

export class CanvasRenderingContext2D {
  /** @internal */
  private _canvas: HTMLCanvasElement;

  /** @internal */
  private _stateStack: IDrawingStyleState[] = [createStackEntry()];

  /** @internal */
  public constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  /** @internal */
  private get _styleState(): IDrawingStyleState {
    return this._stateStack[this._stateStack.length - 1];
  }

  public restore(): void {
    if (this._stateStack.length > 1) {
      this._stateStack.pop();
    }
  }

  public save(): void {
    this._stateStack.push({ ...this._styleState });
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get globalAlpha(): number {
    return 1;
  }

  public get globalCompositeOperation(): "source-over" {
    return "source-over";
  }

  public get fillStyle(): string | CanvasGradient | CanvasPattern {
    return RGBAArrayToCSSColorString(this._styleState.fillStyle);
  }
  public set fillStyle(value: string | CanvasGradient | CanvasPattern) {
    if (typeof value !== "string") {
      throwNotImplemented();
    }
    this._styleState.fillStyle = CSSColorStringToRGBAArray(value);
  }

  /** @internal */
  public get strokeStyle(): string | CanvasGradient | CanvasPattern {
    return throwNotImplemented();
  }
  /** @internal */
  public set strokeStyle(value: never) {
    throwNotImplemented();
  }

  /** @internal */
  public get filter(): string {
    return throwNotImplemented();
  }
  /** @internal */
  public set filter(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get imageSmoothingEnabled(): boolean {
    return throwNotImplemented();
  }
  /** @internal */
  public set imageSmoothingEnabled(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get imageSmoothingQuality(): ImageSmoothingQuality {
    return throwNotImplemented();
  }
  /** @internal */
  public set imageSmoothingQuality(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get lineCap(): CanvasLineCap {
    return throwNotImplemented();
  }
  /** @internal */
  public set lineCap(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get lineDashOffset(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set lineDashOffset(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get lineJoin(): CanvasLineJoin {
    return throwNotImplemented();
  }
  /** @internal */
  public set lineJoin(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get lineWidth(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set lineWidth(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get miterLimit(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set miterLimit(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get shadowBlur(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set shadowBlur(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get shadowColor(): string {
    return throwNotImplemented();
  }
  /** @internal */
  public set shadowColor(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get shadowOffsetX(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set shadowOffsetX(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get shadowOffsetY(): number {
    return throwNotImplemented();
  }
  /** @internal */
  public set shadowOffsetY(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get direction(): CanvasDirection {
    return throwNotImplemented();
  }
  /** @internal */
  public set direction(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get font(): string {
    return throwNotImplemented();
  }
  /** @internal */
  public set font(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get fontKerning(): CanvasFontKerning {
    return throwNotImplemented();
  }
  /** @internal */
  public set fontKerning(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get textAlign(): CanvasTextAlign {
    return throwNotImplemented();
  }
  /** @internal */
  public set textAlign(value: never) {
    throwNotImplemented();
  }
  /** @internal */
  public get textBaseline(): CanvasTextBaseline {
    return throwNotImplemented();
  }
  /** @internal */
  public set textBaseline(value: never) {
    throwNotImplemented();
  }

  createImageData(
    width: number,
    height: number,
    settings?: ImageDataSettings | undefined
  ): ImageData;
  createImageData(imagedata: ImageData): ImageData;
  createImageData(
    arg1: unknown,
    arg2?: unknown,
    settings?: unknown
  ): ImageData {
    if (typeof settings !== "undefined") {
      throwNotImplemented();
    }

    let newWidth, newHeight;
    if (typeof arg1 === "number") {
      if (typeof arg2 !== "number") {
        throwInvalidArgument();
      }

      newWidth = arg1;
      newHeight = arg2;
    } else if (
      arg1 &&
      "width" in (arg1 as ImageData) &&
      "height" in (arg1 as ImageData)
    ) {
      newWidth = (arg1 as ImageData).width;
      newHeight = (arg1 as ImageData).height;
    } else {
      throwInvalidArgument();
    }

    return new ImageData(newWidth, newHeight);
  }

  getImageData(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    settings?: ImageDataSettings | undefined
  ): ImageData {
    if (typeof settings !== "undefined") {
      throwNotImplemented();
    }

    const topLeftX = Math.min(sx, sx + sw) * BytesPerPixel;
    const topLeftY = Math.min(sy, sy + sh);
    const bottomRightX = Math.max(sx, sx + sw) * BytesPerPixel;
    const bottomRightY = Math.max(sy, sy + sh);
    const newWidth = bottomRightX - topLeftX;
    const newHeight = bottomRightY - topLeftY;

    const canvasWidth = this._canvas.width * BytesPerPixel;
    const canvasHeight = this._canvas.height;
    const canvasData = this._canvas._data;

    const imageData = new ImageData(newWidth / BytesPerPixel, newHeight);
    let outIndex = 0;
    for (let y = topLeftY; y < bottomRightY; y++) {
      let rowIndex = topLeftX + y * canvasWidth;
      for (let x = topLeftX; x < topLeftX + newWidth; x++, rowIndex++) {
        if (y < 0 || y >= canvasHeight || x < 0 || x >= canvasWidth) {
          imageData.data[outIndex++] = 0;
        } else {
          imageData.data[outIndex++] = canvasData.data[rowIndex];
        }
      }
    }

    return imageData;
  }

  putImageData(imagedata: ImageData, dx: number, dy: number): void;
  putImageData(
    imagedata: ImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number
  ): void;
  putImageData(
    imagedata: ImageData,
    dx: number,
    dy: number,
    dirtyX?: number,
    dirtyY?: number,
    dirtyWidth?: number,
    dirtyHeight?: number
  ): void {
    if (typeof dirtyX !== "undefined") {
      if (typeof dirtyX !== "number") {
        throwInvalidArgument();
      }
      if (typeof dirtyY !== "number") {
        throwInvalidArgument();
      }
      if (typeof dirtyWidth !== "number") {
        throwInvalidArgument();
      }
      if (typeof dirtyHeight !== "number") {
        throwInvalidArgument();
      }
    } else {
      dirtyX = 0;
      dirtyY = 0;
      dirtyWidth = imagedata.width;
      dirtyHeight = imagedata.height;
    }

    copyImageData(
      imagedata,
      this._canvas._data,
      dirtyX,
      dirtyY,
      dirtyWidth,
      dirtyHeight,
      dx,
      dy,
      dirtyWidth,
      dirtyHeight
    );
  }

  drawImage(image: CanvasImageSource, dx: number, dy: number): void;
  drawImage(
    image: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void;
  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void;
  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw?: number,
    sh?: number,
    dx?: number,
    dy?: number,
    dw?: number,
    dh?: number
  ): void {
    if (!image || !image._data) {
      throwInvalidArgument();
    }

    const imageWidth = image._data.width;
    const imageHeight = image._data.height;

    if (typeof sx !== "number" || typeof sy !== "number") {
      throwInvalidArgument();
    }

    if (arguments.length === 3) {
      dx = sx;
      dy = sy;
      sx = 0;
      sy = 0;
      sw = imageWidth;
      sh = imageHeight;
      dw = sw;
      dh = sh;
    } else if (arguments.length === 5) {
      if (typeof sw !== "number" || typeof sh !== "number") {
        throwInvalidArgument();
      }

      dx = sx;
      dy = sy;
      dw = sw;
      dh = sh;
      sx = 0;
      sy = 0;
      sw = imageWidth;
      sh = imageHeight;
    } else if (arguments.length === 9) {
      if (
        typeof sw !== "number" ||
        typeof sh !== "number" ||
        typeof dx !== "number" ||
        typeof dy !== "number" ||
        typeof dw !== "number" ||
        typeof dh !== "number"
      ) {
        throwInvalidArgument();
      }
    } else {
      throwInvalidArgument();
    }

    copyImageData(
      image._data,
      this._canvas._data,
      sx,
      sy,
      sw,
      sh,
      dx,
      dy,
      dw,
      dh
    );
  }

  clearRect(x: number, y: number, w: number, h: number): void {
    this._fillRect(x, y, w, h, TransparentRGBAArray);
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    this._fillRect(x, y, w, h, this._styleState.fillStyle);
  }

  /** @internal */
  private _fillRect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: RGBAArray
  ): void {
    const topLeftX = Math.min(x, x + w) * BytesPerPixel;
    const topLeftY = Math.min(y, y + h);
    const bottomRightX = Math.max(x, x + w) * BytesPerPixel;
    const bottomRightY = Math.max(y, y + h);
    const fillWidth = bottomRightX - topLeftX;

    const canvasWidth = this._canvas.width * BytesPerPixel;
    const canvasHeight = this._canvas.height;
    const canvasData = this._canvas._data;

    for (let y = topLeftY; y < bottomRightY; y++) {
      if (y < 0 || y >= canvasHeight) {
        continue;
      }

      let rowIndex = topLeftX + y * canvasWidth;
      for (let x = topLeftX; x < topLeftX + fillWidth; x += 4) {
        if (x < 0 || x >= canvasWidth) {
          continue;
        }

        const alpha = color[3];
        const alphaBase = canvasData.data[rowIndex + 3];
        if (alpha === 255 || alphaBase === 0) {
          // No transparency
          canvasData.data[rowIndex++] = color[0];
          canvasData.data[rowIndex++] = color[1];
          canvasData.data[rowIndex++] = color[2];
          canvasData.data[rowIndex++] = alpha;
        } else if (alpha > 0) {
          // Alpha composition.
          // https://drafts.fxtf.org/compositing/#simplealphacompositing
          const ab = alphaBase / 255;
          const as = alpha / 255;

          canvasData.data[rowIndex] = simpleAlphaComposite(
            canvasData.data[rowIndex],
            color[0],
            ab,
            as
          );
          canvasData.data[rowIndex + 1] = simpleAlphaComposite(
            canvasData.data[rowIndex + 1],
            color[1],
            ab,
            as
          );
          canvasData.data[rowIndex + 2] = simpleAlphaComposite(
            canvasData.data[rowIndex + 2],
            color[2],
            ab,
            as
          );
          canvasData.data[rowIndex + 3] = (as + ab * (1 - as)) * 255;
          rowIndex += 4;
        } else {
          rowIndex += 4;
        }
      }
    }
  }

  /** @internal */
  getContextAttributes(): never {
    throwNotImplemented();
  }

  /** @internal */
  beginPath(): void {
    throwNotImplemented();
  }

  /** @internal */
  clip(fillRule?: CanvasFillRule | undefined): void;
  /** @internal */
  clip(path: Path2D, fillRule?: CanvasFillRule | undefined): void;
  /** @internal */
  clip(path?: unknown, fillRule?: unknown): void {
    throwNotImplemented();
  }

  /** @internal */
  fill(fillRule?: CanvasFillRule | undefined): void;
  /** @internal */
  fill(path: Path2D, fillRule?: CanvasFillRule | undefined): void;
  /** @internal */
  fill(path?: unknown, fillRule?: unknown): void {
    throwNotImplemented();
  }

  /** @internal */
  isPointInPath(
    x: number,
    y: number,
    fillRule?: CanvasFillRule | undefined
  ): boolean;
  /** @internal */
  isPointInPath(
    path: Path2D,
    x: number,
    y: number,
    fillRule?: CanvasFillRule | undefined
  ): boolean;
  /** @internal */
  isPointInPath(
    path: unknown,
    x: unknown,
    y?: unknown,
    fillRule?: unknown
  ): boolean {
    throwNotImplemented();
  }

  /** @internal */
  isPointInStroke(x: number, y: number): boolean;
  /** @internal */
  isPointInStroke(path: Path2D, x: number, y: number): boolean;
  /** @internal */
  isPointInStroke(path: unknown, x: unknown, y?: unknown): boolean {
    throwNotImplemented();
  }

  /** @internal */
  stroke(): void;
  /** @internal */
  stroke(path: Path2D): void;
  /** @internal */
  stroke(path?: unknown): void {
    throwNotImplemented();
  }

  /** @internal */
  createConicGradient(
    startAngle: number,
    x: number,
    y: number
  ): CanvasGradient {
    throwNotImplemented();
  }
  /** @internal */
  createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): CanvasGradient {
    throwNotImplemented();
  }
  /** @internal */
  createPattern(
    image: CanvasImageSource,
    repetition: string | null
  ): CanvasPattern | null {
    throwNotImplemented();
  }
  /** @internal */
  createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): CanvasGradient {
    throwNotImplemented();
  }

  /** @internal */
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean | undefined
  ): void {
    throwNotImplemented();
  }
  /** @internal */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    throwNotImplemented();
  }
  /** @internal */
  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): void {
    throwNotImplemented();
  }
  /** @internal */
  closePath(): void {
    throwNotImplemented();
  }
  /** @internal */
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean | undefined
  ): void {
    throwNotImplemented();
  }
  /** @internal */
  lineTo(x: number, y: number): void {
    throwNotImplemented();
  }
  /** @internal */
  moveTo(x: number, y: number): void {
    throwNotImplemented();
  }
  /** @internal */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
    throwNotImplemented();
  }
  /** @internal */
  rect(x: number, y: number, w: number, h: number): void {
    throwNotImplemented();
  }
  /** @internal */
  roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radii?: number | DOMPointInit | (number | DOMPointInit)[] | undefined
  ): void;
  /** @internal */
  roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radii?: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined
  ): void;
  /** @internal */
  roundRect(
    x: unknown,
    y: unknown,
    w: unknown,
    h: unknown,
    radii?: unknown
  ): void {
    throwNotImplemented();
  }
  /** @internal */
  getLineDash(): number[] {
    throwNotImplemented();
  }
  /** @internal */
  setLineDash(segments: number[]): void;
  /** @internal */
  setLineDash(segments: Iterable<number>): void;
  /** @internal */
  setLineDash(segments: unknown): void {
    throwNotImplemented();
  }

  /** @internal */
  strokeRect(x: number, y: number, w: number, h: number): void {
    throwNotImplemented();
  }

  /** @internal */
  fillText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number | undefined
  ): void {
    throwNotImplemented();
  }

  /** @internal */
  measureText(text: string): TextMetrics {
    throwNotImplemented();
  }

  /** @internal */
  strokeText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number | undefined
  ): void {
    throwNotImplemented();
  }

  /** @internal */
  getTransform(): DOMMatrix {
    throwNotImplemented();
  }

  /** @internal */
  resetTransform(): void {
    throwNotImplemented();
  }

  /** @internal */
  rotate(angle: number): void {
    throwNotImplemented();
  }

  /** @internal */
  scale(x: number, y: number): void {
    throwNotImplemented();
  }

  /** @internal */
  setTransform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): void;
  /** @internal */
  setTransform(transform?: DOMMatrix2DInit | undefined): void;
  /** @internal */
  setTransform(
    a?: unknown,
    b?: unknown,
    c?: unknown,
    d?: unknown,
    e?: unknown,
    f?: unknown
  ): void {
    throwNotImplemented();
  }

  /** @internal */
  transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): void {
    throwNotImplemented();
  }

  /** @internal */
  translate(x: number, y: number): void {
    throwNotImplemented();
  }

  /** @internal */
  drawFocusIfNeeded(element: Element): void;
  /** @internal */
  drawFocusIfNeeded(path: Path2D, element: Element): void;
  /** @internal */
  drawFocusIfNeeded(path: unknown, element?: unknown): void {
    throwNotImplemented();
  }
}

interface IDrawingStyleState {
  fillStyle: RGBAArray;
}

function createStackEntry(): IDrawingStyleState {
  return {
    fillStyle: [0, 0, 0, 255],
  };
}

function copyImageData(
  src: ImageData,
  dest: ImageData,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number
): void {
  if (sw !== dw || sh !== dh) {
    throwNotImplemented("Image resize not supported.");
  }

  sx *= BytesPerPixel;
  sw *= BytesPerPixel;
  dx *= BytesPerPixel;

  const destDataWidth = dest.width * BytesPerPixel;
  const destDataHeight = dest.height;
  const srcDataWidth = src.width * BytesPerPixel;
  const srcDataHeight = src.height;
  for (let y = sy; y < sy + sh; y++, dy++) {
    let srcRowIndex = sx + y * srcDataWidth;
    let destRowIndex = dx + dy * destDataWidth;
    for (let x = sx, dxLive = dx; x < sx + sw; x += 4, dxLive += 4) {
      let r, g, b, a;
      if (y < 0 || y >= srcDataHeight || x < 0 || x >= srcDataWidth) {
        r = g = b = a = 0;
        srcRowIndex += 4;
      } else {
        r = src.data[srcRowIndex++];
        g = src.data[srcRowIndex++];
        b = src.data[srcRowIndex++];
        a = src.data[srcRowIndex++];
      }

      if (
        dy >= 0 &&
        dy < destDataHeight &&
        dxLive >= 0 &&
        dxLive < destDataWidth
      ) {
        if (a === 255) {
          // No transparency
          dest.data[destRowIndex++] = r;
          dest.data[destRowIndex++] = g;
          dest.data[destRowIndex++] = b;
          dest.data[destRowIndex++] = a;
        } else if (a > 0) {
          // Alpha composition.
          // https://drafts.fxtf.org/compositing/#simplealphacompositing
          const ab = dest.data[destRowIndex + 3] / 255;
          const as = a / 255;

          dest.data[destRowIndex] = simpleAlphaComposite(
            dest.data[destRowIndex],
            r,
            ab,
            as
          );
          dest.data[destRowIndex + 1] = simpleAlphaComposite(
            dest.data[destRowIndex + 1],
            g,
            ab,
            as
          );
          dest.data[destRowIndex + 2] = simpleAlphaComposite(
            dest.data[destRowIndex + 2],
            b,
            ab,
            as
          );
          dest.data[destRowIndex + 3] = (as + ab * (1 - as)) * 255;
          destRowIndex += 4;
        } else {
          destRowIndex += 4;
        }
      } else {
        destRowIndex += 4;
      }
    }
  }
}

function simpleAlphaComposite(
  colorByteBackdrop: number,
  colorByteSrc: number,
  ab: number,
  as: number
): number {
  return (
    ((colorByteSrc / 255) * as + (colorByteBackdrop / 255) * ab * (1 - as)) *
    255
  );
}
