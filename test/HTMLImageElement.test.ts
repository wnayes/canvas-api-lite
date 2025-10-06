import { expect, test, describe } from "vitest";
import { Image, HTMLImageElement } from "../src/HTMLImageElement";

describe("Image", () => {
  test("constructor returns HTMLImageElement instance", () => {
    expect(new Image() instanceof HTMLImageElement).toBe(true);
  });
});
