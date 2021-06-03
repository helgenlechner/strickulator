import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  value: string;
}

export const StrokeStyle: React.FC<Props> = ({ value }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.strokeStyle = value;

  return null;
};
