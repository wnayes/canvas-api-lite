export const BytesPerPixel = 4;

export function throwNotImplemented(msg?: string): never {
  let errMessage = "Not implemented.";
  if (msg) {
    errMessage += " " + msg;
  }
  throw new Error(errMessage);
}

export function throwInvalidArgument(): never {
  throw new Error("Invalid argument.");
}
