import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  value: number[];
}

export const LineDash: React.FC<Props> = ({ value }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.setLineDash(value);

  return null;
};
