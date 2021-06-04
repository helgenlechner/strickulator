import * as React from 'react';
import { CanvasContext } from '../../context/canvas.context';
import { FrameCountContext } from '../../context/frameCount.context';

interface Props {
  width: number;
  height: number | undefined;
}

export const Canvas: React.FC<Props> = ({ children, width, height }) => {
  const [canvasRef, setCanvasRef] =
    React.useState<HTMLCanvasElement | null>(null);
  const [frameCount, setFrameCount] = React.useState(0);

  React.useEffect(() => {
    setFrameCount(frameCount + 1);
  }, [width, height]);

  return (
    <>
      <canvas ref={setCanvasRef} width={width} height={height} />
      <CanvasContext.Provider value={canvasRef?.getContext('2d') ?? undefined}>
        <FrameCountContext.Provider value={frameCount}>
          {children}
        </FrameCountContext.Provider>
      </CanvasContext.Provider>
    </>
  );
};
