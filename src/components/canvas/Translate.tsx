import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  x: number;
  y: number;
}

export const Translate: React.FC<Props> = ({ x, y }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.translate(x, y);

  return null;
};
