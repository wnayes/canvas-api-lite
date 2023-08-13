# canvas-api-lite

An implementation of the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for use in non-browser contexts like Node.js.

Unlike [node-canvas](https://github.com/Automattic/node-canvas), this implementation has no native dependencies. However, this library only implements a small subset of the Canvas API.

The intended use case is to port code that operated against ImageData / Canvas to platforms like Node.js.

## Supported APIs

This module exports the following types with implemented features as noted.

- `CanvasRenderingContext2D`

  - `constructor(canvas)`
  - `canvas` getter property
  - `save` / `restore`
  - `createImageData`
    - `settings` argument not supported.
  - `getImageData`
    - `settings` argument not supported.
  - `putImageData`
  - `drawImage`
    - Scaling of the drawn image is not supported. Consider using a separate library like [`resize-image-data`](https://www.npmjs.com/package/resize-image-data) to scale prior to calling.
  - `fillStyle`
    - Limited color formats (see below)
  - `clearRect`
  - `fillRect`

- `HTMLCanvasElement`

  - `constructor(width?, height?)`
    - Non-standard. This is how you instantiate this type without `document.createElement`.
  - `width` property
  - `height` property
  - `getContext`
    - `"2d"` parameter only
  - `toDataURL`
    - Limited to creating `image/png` URLs.
  - DOM properties `id`, `outerHTML`, `innerHTML`, `tagName` have very basic implementations.
  - Element constants like `ELEMENT_NODE` are defined.

- `HTMLImageElement`

  - The `Image` type is provided to construct an `HTMLImageElement`.
  - `src` property
    - Currently limited to accepting PNG Data URLs.
  - `width` getter property
  - `height` getter property
    - Same as `naturalWidth` / `naturalHeight`.
  - `naturalWidth` getter property
  - `naturalHeight` getter property
  - `complete` getter property
  - `addEventListener`
  - `removeEventListener`
    - `load`, `error` event types only.

- `ImageData`
  - `constructor`
    - `settings` argument not supported.
    - Both `width` and `height` must be passed. (Does not infer `height` from `width` and data array size.)
  - `data` getter property
  - `width` getter property
  - `height` getter property
  - `colorSpace` getter property
    - Always `srgb`.

Supported color formats

- Hex colors (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`)
- RGB colors (`rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`)
- The ~150 standard CSS [named colors](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color).
