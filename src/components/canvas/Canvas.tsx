import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';

interface Props {
  width: number | undefined;
  height: number | undefined;
}

export const Canvas: React.FC<Props> = ({ children, width = 600, height }) => {
  const [canvasRef, setCanvasRef] =
    React.useState<HTMLCanvasElement | null>(null);

  return (
    <>
      <canvas ref={setCanvasRef} width={width} height={height} />
      <CanvasContext.Provider value={canvasRef?.getContext('2d') ?? undefined}>
        {children}
      </CanvasContext.Provider>
    </>
  );
};
