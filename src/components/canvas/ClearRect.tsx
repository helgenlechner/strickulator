import * as React from 'react';
import { useCanvasContext } from '../../context/canvas.context';

interface Props {
  width: number;
  height: number;
}

export const ClearRect: React.FC<Props> = ({ width, height }) => {
  const context = useCanvasContext();

  if (!context) {
    return null;
  }

  context.clearRect(0, 0, width, height);

  return null;
};
