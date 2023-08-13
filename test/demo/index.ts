import TestCases, { ICanvasImpl, ImageDataLike } from "../TestCases";
import {
  HTMLCanvasElement as LibHTMLCanvasElement,
  Image as LibImage,
} from "canvas-api-lite";

const container = document.getElementById("container")!;

const NativeContext: ICanvasImpl = {
  createCanvas(width, height) {
    // I don't know if we can ever avoid this cast...
    const canvas = document.createElement("canvas") as unknown as ReturnType<
      ICanvasImpl["createCanvas"]
    >;
    canvas.width = width;
    canvas.height = height;
    return canvas;
  },
  Image: Image as any,
};

const LibContext: ICanvasImpl = {
  createCanvas(width, height) {
    return new LibHTMLCanvasElement(width, height);
  },
  Image: LibImage as any,
};

function createNativeImageData(imageDataLike: ImageDataLike): ImageData {
  const imageData = new ImageData(imageDataLike.width, imageDataLike.height);
  imageData.data.set(imageDataLike.data);
  return imageData;
}

function createTestResultCanvas(
  imageDataLike: ImageDataLike
): HTMLCanvasElement {
  const imageData = createNativeImageData(imageDataLike);
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d")!.putImageData(imageData, 0, 0);
  return canvas;
}

(async () => {
  for (const testCase of TestCases) {
    const testRowDiv = document.createElement("div");
    testRowDiv.classList.add("testCaseDiv");

    Promise.resolve(testCase.execute(NativeContext))
      .then((imageDataNative) => {
        testRowDiv.appendChild(createTestResultCanvas(imageDataNative));
      })
      .then(() =>
        Promise.resolve(testCase.execute(LibContext)).then((imageDataLib) => {
          testRowDiv.appendChild(createTestResultCanvas(imageDataLib));
        })
      );

    container.append(testRowDiv);
  }
})();
