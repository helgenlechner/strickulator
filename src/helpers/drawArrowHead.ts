import { drawPolygon } from './drawPolygon';

const width = 6;
const height = 4;

export const drawArrowHead = (
  context: CanvasRenderingContext2D,
  [x, y]: [number, number],
) => {
  drawPolygon(context, [
    { x, y },
    { x: x + width, y: y - height / 2 },
    { x: x + width, y: y + height / 2 },
  ]);
  context.fill();
};
