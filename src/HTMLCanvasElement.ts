import { throwNotImplemented } from "./Utils";
import { CanvasRenderingContext2D } from "./CanvasRenderingContext2D";
import { ImageData } from "./ImageData";
import { encodeArrayBufferToBase64 } from "./Base64Utils";
import { encode } from "./PNG";

const DefaultHeight = 150;
const DefaultWidth = 300;

export class HTMLCanvasElement {
  /** @internal */
  private _context: CanvasRenderingContext2D | undefined;
  /** @internal */
  private _height: number;
  /** @internal */
  private _width: number;
  /** @internal */
  private _id: string | undefined;
  /** @internal */
  private __data!: ImageData;

  public constructor(width?: number, height?: number) {
    this._height = height ?? DefaultHeight;
    this._width = width ?? DefaultWidth;
    this.__createData();
  }

  /** @internal */
  public get _data(): ImageData {
    return this.__data;
  }

  /** @internal */
  private __createData(): void {
    this.__data = new ImageData(this._width, this._height);
  }

  get height(): number {
    return this._height;
  }
  set height(value: number) {
    if (typeof value !== "number" || value < 0) {
      this._height = DefaultHeight;
    } else {
      this._height = Math.floor(value);
    }
    this.__createData();
  }

  get width(): number {
    return this._width;
  }
  set width(value: number) {
    if (typeof value !== "number" || value < 0) {
      this._width = DefaultWidth;
    } else {
      this._width = Math.floor(value);
    }
    this.__createData();
  }

  public get id(): string {
    return this._id ?? "";
  }
  public set id(value: string) {
    this._id = value;
  }

  getContext(
    contextId: "2d",
    options?: CanvasRenderingContext2DSettings | undefined
  ): CanvasRenderingContext2D | null;
  getContext(
    contextId: "bitmaprenderer",
    options?: ImageBitmapRenderingContextSettings | undefined
  ): never;
  getContext(
    contextId: "webgl",
    options?: WebGLContextAttributes | undefined
  ): never;
  getContext(
    contextId: "webgl2",
    options?: WebGLContextAttributes | undefined
  ): never;
  getContext(
    contextId: unknown,
    options?: unknown
  ): CanvasRenderingContext2D | null {
    if (contextId !== "2d") {
      throwNotImplemented();
    }
    if (typeof options !== "undefined") {
      throwNotImplemented();
    }

    if (!this._context) {
      this._context = new CanvasRenderingContext2D(this);
    }
    return this._context;
  }

  toDataURL(type?: string | undefined, quality?: any): string {
    if (typeof type === "string" && type !== "image/png") {
      throwNotImplemented();
    }

    if (this._width === 0 && this._height === 0) {
      return "data:,";
    }

    const pngArrayBuffer = encode(
      this.__data.data.buffer,
      this._width,
      this._height
    );

    return "data:image/png;base64," + encodeArrayBufferToBase64(pngArrayBuffer);
  }

  toBlob(
    callback: BlobCallback,
    type?: string | undefined,
    quality?: any
  ): void {
    throwNotImplemented();
  }

  transferControlToOffscreen(): never {
    throwNotImplemented();
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (
      this: globalThis.HTMLCanvasElement,
      ev: HTMLElementEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throwNotImplemented();
  }

  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (
      this: globalThis.HTMLCanvasElement,
      ev: HTMLElementEventMap[K]
    ) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown
  ): void {
    throwNotImplemented();
  }

  attachInternals(): ElementInternals {
    throwNotImplemented();
  }

  captureStream(frameRequestRate?: number | undefined): never {
    throwNotImplemented();
  }

  click(): void {
    throwNotImplemented();
  }

  get outerHTML(): string {
    // TODO: Technically could be affected by assigned attributes.
    return "<canvas></canvas>";
  }

  get innerHTML(): string {
    return "";
  }

  get ownerDocument(): never {
    return throwNotImplemented();
  }

  get tagName(): string {
    return "CANVAS";
  }

  attachShadow(init: ShadowRootInit): ShadowRoot {
    throwNotImplemented();
  }

  checkVisibility(options?: CheckVisibilityOptions | undefined): boolean {
    throwNotImplemented();
  }

  computedStyleMap(): StylePropertyMapReadOnly {
    throwNotImplemented();
  }
  getAttribute(qualifiedName: string): string | null {
    throwNotImplemented();
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throwNotImplemented();
  }
  getAttributeNames(): string[] {
    throwNotImplemented();
  }
  getAttributeNode(qualifiedName: string): Attr | null {
    throwNotImplemented();
  }
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
    throwNotImplemented();
  }
  getBoundingClientRect(): DOMRect {
    throwNotImplemented();
  }
  getClientRects(): DOMRectList {
    throwNotImplemented();
  }

  hasAttribute(qualifiedName: string): boolean {
    throwNotImplemented();
  }
  hasAttributeNS(namespace: string | null, localName: string): boolean {
    throwNotImplemented();
  }
  hasAttributes(): boolean {
    throwNotImplemented();
  }
  hasPointerCapture(pointerId: number): boolean {
    throwNotImplemented();
  }
  matches(selectors: string): boolean {
    throwNotImplemented();
  }
  releasePointerCapture(pointerId: number): void {
    throwNotImplemented();
  }
  removeAttribute(qualifiedName: string): void {
    throwNotImplemented();
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throwNotImplemented();
  }
  removeAttributeNode(attr: Attr): Attr {
    throwNotImplemented();
  }
  requestFullscreen(options?: FullscreenOptions | undefined): Promise<void> {
    throwNotImplemented();
  }
  requestPointerLock(): void {
    throwNotImplemented();
  }
  scroll(options?: ScrollToOptions | undefined): void;
  scroll(x: number, y: number): void;
  scroll(x?: unknown, y?: unknown): void {
    throwNotImplemented();
  }
  scrollBy(options?: ScrollToOptions | undefined): void;
  scrollBy(x: number, y: number): void;
  scrollBy(x?: unknown, y?: unknown): void {
    throwNotImplemented();
  }
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions | undefined): void {
    throwNotImplemented();
  }
  scrollTo(options?: ScrollToOptions | undefined): void;
  scrollTo(x: number, y: number): void;
  scrollTo(x?: unknown, y?: unknown): void {
    throwNotImplemented();
  }
  setAttribute(qualifiedName: string, value: string): void {
    throwNotImplemented();
  }
  setAttributeNS(
    namespace: string | null,
    qualifiedName: string,
    value: string
  ): void {
    throwNotImplemented();
  }
  setAttributeNode(attr: Attr): Attr | null {
    throwNotImplemented();
  }
  setAttributeNodeNS(attr: Attr): Attr | null {
    throwNotImplemented();
  }
  setPointerCapture(pointerId: number): void {
    throwNotImplemented();
  }
  toggleAttribute(qualifiedName: string, force?: boolean | undefined): boolean {
    throwNotImplemented();
  }
  webkitMatchesSelector(selectors: string): boolean {
    throwNotImplemented();
  }

  appendChild<T extends Node>(node: T): T {
    throwNotImplemented();
  }
  cloneNode(deep?: boolean | undefined): Node {
    throwNotImplemented();
  }
  compareDocumentPosition(other: Node): number {
    throwNotImplemented();
  }
  contains(other: Node | null): boolean {
    throwNotImplemented();
  }
  getRootNode(options?: GetRootNodeOptions | undefined): Node {
    throwNotImplemented();
  }
  hasChildNodes(): boolean {
    throwNotImplemented();
  }
  insertBefore<T extends Node>(node: T, child: Node | null): T {
    throwNotImplemented();
  }
  isDefaultNamespace(namespace: string | null): boolean {
    throwNotImplemented();
  }
  isEqualNode(otherNode: Node | null): boolean {
    throwNotImplemented();
  }
  isSameNode(otherNode: Node | null): boolean {
    throwNotImplemented();
  }
  lookupNamespaceURI(prefix: string | null): string | null {
    throwNotImplemented();
  }
  lookupPrefix(namespace: string | null): string | null {
    throwNotImplemented();
  }
  normalize(): void {
    throwNotImplemented();
  }

  public ELEMENT_NODE: number = 1;
  public ATTRIBUTE_NODE: number = 2;
  public TEXT_NODE: number = 3;
  public CDATA_SECTION_NODE: number = 4;
  public ENTITY_REFERENCE_NODE: number = 5;
  public ENTITY_NODE: number = 6;
  public PROCESSING_INSTRUCTION_NODE: number = 7;
  public COMMENT_NODE: number = 8;
  public DOCUMENT_NODE: number = 9;
  public DOCUMENT_TYPE_NODE: number = 10;
  public DOCUMENT_FRAGMENT_NODE: number = 11;
  public NOTATION_NODE: number = 12;
  public DOCUMENT_POSITION_DISCONNECTED: number = 1;
  public DOCUMENT_POSITION_PRECEDING: number = 2;
  public DOCUMENT_POSITION_FOLLOWING: number = 4;
  public DOCUMENT_POSITION_CONTAINS: number = 8;
  public DOCUMENT_POSITION_CONTAINED_BY: number = 16;
  public DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number = 32;

  dispatchEvent(event: Event): boolean {
    throwNotImplemented();
  }

  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions | undefined
  ): Animation {
    throwNotImplemented();
  }
  getAnimations(options?: GetAnimationsOptions | undefined): Animation[] {
    throwNotImplemented();
  }
  after(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }
  before(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }
  remove(): void {
    throwNotImplemented();
  }
  replaceWith(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }

  append(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }
  prepend(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }

  replaceChildren(...nodes: (string | Node)[]): void {
    throwNotImplemented();
  }

  blur(): void {
    throwNotImplemented();
  }
  focus(options?: FocusOptions | undefined): void {
    throwNotImplemented();
  }
}
