import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

export const ResetTransformation: React.FC = () => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  return null;
};
