import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';
import { drawPolygon } from '../../helpers/drawPolygon';

const width = 6;
const height = 4;

interface Props {
  x: number;
  y: number;
}

export const ArrowHead: React.FC<Props> = ({ x, y }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  drawPolygon(context, [
    { x: x - width, y },
    { x: x, y: y - height / 2 },
    { x: x, y: y + height / 2 },
  ]);

  context.fill();

  return null;
};
