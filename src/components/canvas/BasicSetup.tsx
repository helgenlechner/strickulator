import * as React from 'react';
import { fontSize } from '../../constants/fontSize';
import { CanvasContext } from '../../context/canvas.context';

export const BasicSetup: React.FC = () => {
  const context = React.useContext(CanvasContext);

  if (!context) {
    return null;
  }

  context.lineWidth = 2;
  context.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`;
  context.textAlign = 'center';
  context.fillStyle = '#242f40';

  return null;
};
