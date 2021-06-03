export const ellipseCartesianFunction = (a: number, b: number, y: number) =>
  a * Math.sqrt(1 - Math.pow(y - b, 2) / Math.pow(b, 2));
