import { HTMLCanvasElement, HTMLImageElement } from "canvas-api-lite";

interface ITestCase {
  name: string;
  execute(impl: ICanvasImpl): ImageDataLike | Promise<ImageDataLike>;
}

export interface ICanvasImpl {
  createCanvas(width: number, height: number): HTMLCanvasElement;
  Image: new () => HTMLImageElement;
}

export interface ImageDataLike {
  readonly data: Uint8ClampedArray;
  readonly width: number;
  readonly height: number;
}

const CheckmarkImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC";
const CanvasImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECElEQVR4nO2ay2vUQBzHIz5RL6Lk4MGKeKpJ1R59UB/gTQ+a8QGCYKtgwZuIWKG+kqnWgz148OD7YF3apFaprW7/gG13ZheRHiriepA28YVP1Koj2W3XmWxmH91MXKU/+J32O7/f7zO/mWzIjCRN2X9qHXpirWnEFhar774QX+SOkSrJus6hxRbEZNxfWwbq4WktiB+kNeN6d6xUKWbpaDMFQiwDxbhaiAZobZee2ChVilkGbqSLMw10g6c1Ib7JaFvwIalSzIKojekIxMd5WtNATZ7uXZQqxSyI+phZ1tF2nrZLxxrbPdwrvEB56DupJJemQIb+fhfkqY5QFtiMTNJkUR0JtMp/FYTs768iDdEoaej/ROr7H5GDj5aEll8uMVDV831zAAHT/X4bhyCUPww6fyCBXADF0TpUW7tTR+pmeH8n9dGPLEj0Q5D5gwlEpGmqrV1RHUDS7gOTXk6V3hHV1tqyEFnXbtHLLLNH+h9mOhPtm9gjroa3HOUwQVQbnMyF4HeGNhdAdcBNnk4OC0S1tUYuRAGYLEQenRwGiDIK9qq29pMtGrxRHZAqtMwyENqtQjpZNEjNq51bFRuM0UUoDvhcY4N11W/BEtUBz3idyelEng7KIkEUB9QpDvji6cS3FfaOLRPjVo7sWqo42nO/GffvhH9nZFEgqrOzVrW190wnbPBDtYHmHcuHyfEUbznKokAUBzieTvxSHa2BN74ImJSrcd0PRhbXkZz1fLRQDP6eAS/U0e3L8unkkEBgsXFyivRA8HSyaBDF0a67ryWlxMoWyYHwg5EFg0R4rxSFbGI/FKNTHZASuNm13moCZkkh2MqRXUuFgdSM7J0XaLUl5pdKMc8XQ19v3TZIjqyIZf3SvsGCY3jujqVjtW4rHCswkFMbBpjkVw+jSYNcO4yYWKc3DoQHcqz2T2LX209MHqS9iQU5VhsLByTSjJnER2tixDImB5H5iI3TMeiYkeYAQAqC6vH1zEdoiBI8rQnxU1p710DLfWMaKEnrOsI4yTL1xAHPjN7maS2IU0yBZ1CVb0yI25mYOq4XCpFOaqALbKvRSb4Wv6S1vGM2NwY7Oei8UIhMUnyPTtrZgnbztchhtK1J2U9nGngPs1wN3C0Uwm/dW2cTq/ha9I7W3oePF/jpumBytacjw0IhIs1PZpkQj/2ZOfSrrzXJ/bc3DfSJfeI9me+n626Oz7Ug+kntux89bcOzhYF06knF8yhM5dNbEH2j9fmKMw38gtlPOq4WAjFe2I5Szv9MA31lOhKJTA/iHLJsK+dE9vLl+MygTobLNpFn5KWc1ZdtIm8tdML4pmJvT5Rt7h0TUfdI6PsspoFf5bvPEpi5t4BEvA9ZLXhNKTeM/kv7DWuj1uA8yECAAAAAAElFTkSuQmCC";

function loadImageAsync(
  Image: any,
  dataUri: string
): Promise<HTMLImageElement> {
  const image = new Image();
  const loadPromise = new Promise<HTMLImageElement>((resolve) =>
    image.addEventListener("load", () => resolve(image))
  );
  image.src = dataUri;
  return loadPromise;
}

const TestCases: ITestCase[] = [
  {
    name: "Blank canvas",
    execute({ createCanvas }) {
      return createCanvas(100, 100)
        .getContext("2d")!
        .getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: entire canvas (css color)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: entire canvas (rgb short)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "#741";
      context.fillRect(0, 0, 100, 100);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: entire canvas (rgb long)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: entire canvas (rgb decimal)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "rgb(30, 70, 45)";
      context.fillRect(0, 0, 100, 100);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: rgba alpha compositing",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(10, 10, 50, 50);
      context.fillStyle = "rgba(0, 0, 255, 0.5)";
      context.fillRect(40, 40, 50, 50);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "fillRect: rgba alpha compositing two layers",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "rgba(255, 0, 0, 0.5)";
      context.fillRect(10, 10, 50, 50);
      context.fillStyle = "rgba(0, 0, 255, 0.5)";
      context.fillRect(40, 40, 50, 50);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, 25, 25);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (full)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 100, 100);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, 0, 0);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (out of bounds bottom right)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, 75, 75);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (out of bounds bottom left)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, -25, 75);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (out of bounds top left)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, -25, -25);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (out of bounds top right)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, 75, -25);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "get/putImageData (out of bounds)",
    execute({ createCanvas }) {
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      const redBox = context.getImageData(0, 0, 50, 50);
      context.fillStyle = "#336699";
      context.fillRect(0, 0, 100, 100);
      context.putImageData(redBox, 200, 200);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "draw image (origin)",
    async execute({ createCanvas, Image }) {
      const image = await loadImageAsync(Image, CheckmarkImage);
      const context = createCanvas(100, 100).getContext("2d")!;
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "draw image (offset)",
    async execute({ createCanvas, Image }) {
      const image = await loadImageAsync(Image, CheckmarkImage);
      const context = createCanvas(100, 100).getContext("2d")!;
      context.drawImage(image, 25, 25);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "draw image (out of bounds bottom right)",
    async execute({ createCanvas, Image }) {
      const image = await loadImageAsync(Image, CheckmarkImage);
      const context = createCanvas(100, 100).getContext("2d")!;
      context.drawImage(image, 90, 90);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "draw image (out of bounds top right)",
    async execute({ createCanvas, Image }) {
      const image = await loadImageAsync(Image, CanvasImage);
      const context = createCanvas(100, 100).getContext("2d")!;
      context.drawImage(image, 70, -30);
      return context.getImageData(0, 0, 100, 100);
    },
  },
  {
    name: "draw image over color",
    async execute({ createCanvas, Image }) {
      const image = await loadImageAsync(Image, CanvasImage);
      const context = createCanvas(100, 100).getContext("2d")!;
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
      context.drawImage(image, 25, 25);
      return context.getImageData(0, 0, 100, 100);
    },
  },
];

export default TestCases;
