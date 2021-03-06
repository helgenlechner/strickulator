export const drawPolygon = (
  context: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  legacy: boolean = true,
) => {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }

  if (legacy) {
    context.closePath();
    context.stroke();
  }
};
