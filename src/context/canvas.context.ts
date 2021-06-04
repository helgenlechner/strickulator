import * as React from 'react';
import { FrameCountContext } from './frameCount.context';

export const CanvasContext =
  React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const useCanvasContext = () => {
  React.useContext(FrameCountContext);

  return React.useContext(CanvasContext);
};
