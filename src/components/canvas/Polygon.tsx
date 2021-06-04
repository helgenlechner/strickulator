import * as React from 'react';
import { useCanvasContext } from '../../context/canvas.context';

interface Props {
  points: { x: number; y: number }[];
  closePath?: boolean;
}

export const Polygon: React.FC<Props> = ({ points, closePath }) => {
  const context = useCanvasContext();

  if (!context) {
    return null;
  }

  context.beginPath();

  context.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }

  if (closePath) {
    context.closePath();
  }

  context.stroke();

  return null;
};
