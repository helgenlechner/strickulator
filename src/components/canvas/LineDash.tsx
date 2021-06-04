import * as React from 'react';
import { useCanvasContext } from '../../context/canvas.context';

interface Props {
  value: number[];
}

export const LineDash: React.FC<Props> = ({ value }) => {
  const context = useCanvasContext();

  if (!context) {
    return null;
  }

  context.setLineDash(value);

  return null;
};
