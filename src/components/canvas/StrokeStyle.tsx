import * as React from 'react';
import { useCanvasContext } from '../../context/canvas.context';

interface Props {
  value: string;
}

export const StrokeStyle: React.FC<Props> = ({ value }) => {
  const context = useCanvasContext();

  if (!context) {
    return null;
  }

  context.strokeStyle = value;

  return null;
};
