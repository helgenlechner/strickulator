import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  content: string;
  x: number;
  y: number;
  maxWidth?: number;
}

export const Text: React.FC<Props> = ({ content, x, y, maxWidth }) => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.fillText(content, x, y, maxWidth);

  return null;
};
