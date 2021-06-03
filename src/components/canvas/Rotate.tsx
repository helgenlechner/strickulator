import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  degrees: number;
}

export const Rotate: React.FC<Props> = ({ degrees }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.rotate((degrees * Math.PI) / 180);

  return null;
};
