import { expect, test, describe } from "vitest";
import { CSSColorStringToRGBAArray } from "../src/Colors";

describe("CSSColorStringToRGBAArray", () => {
  test("transparent string parses", () => {
    expect(CSSColorStringToRGBAArray("transparent")).toEqual([0, 0, 0, 0]);
    expect(CSSColorStringToRGBAArray("Transparent")).toEqual([0, 0, 0, 0]);
    expect(CSSColorStringToRGBAArray("TRANSPARENT")).toEqual([0, 0, 0, 0]);
  });

  test("6 length RGB hex string parses", () => {
    expect(CSSColorStringToRGBAArray("#774411")).toEqual([119, 68, 17, 255]);
  });

  test("7 length RGBA hex string parses", () => {
    expect(CSSColorStringToRGBAArray("#009911AA")).toEqual([0, 153, 17, 170]);
  });

  test("3 length RGB hex string parses", () => {
    expect(CSSColorStringToRGBAArray("#741")).toEqual([119, 68, 17, 255]);
  });

  test("4 length RGBA hex string parses", () => {
    expect(CSSColorStringToRGBAArray("#091A")).toEqual([0, 153, 17, 170]);
  });

  test("rgb string parses", () => {
    expect(CSSColorStringToRGBAArray("rgb(119,68,17)")).toEqual([
      119, 68, 17, 255,
    ]);
    expect(CSSColorStringToRGBAArray("rgb(119, 68, 17)")).toEqual([
      119, 68, 17, 255,
    ]);
  });

  test("rgba string parses", () => {
    expect(CSSColorStringToRGBAArray("rgba(0,153,17,0.2)")).toEqual([
      0, 153, 17, 51,
    ]);
    expect(CSSColorStringToRGBAArray("rgba(0, 153, 17, 0.2)")).toEqual([
      0, 153, 17, 51,
    ]);
    expect(CSSColorStringToRGBAArray("rgba(0, 153, 17, .2)")).toEqual([
      0, 153, 17, 51,
    ]);
    expect(CSSColorStringToRGBAArray("rgba(0, 153, 17, 1)")).toEqual([
      0, 153, 17, 255,
    ]);
  });
});
