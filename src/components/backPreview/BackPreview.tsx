import { FunctionComponent, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { backState } from '../../state/back/back.state';

export const BackPreview: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [back] = useRecoilState(backState);
  const canvasCenter = 300;
  const canvasHeight = 600;

  const context = canvasRef?.current?.getContext('2d');

  if (context) {
    let y = canvasHeight - (back.hemHeight ?? 0);

    context.strokeRect(
      canvasCenter - (back.hemWidth ?? 0) / 2,
      y,
      back.hemWidth ?? 0,
      back.hemHeight ?? 0,
    );

    context.beginPath();
    context.moveTo(canvasCenter - (back.hemWidth ?? 0) / 2, y);
    context.lineTo(
      canvasCenter - (back.widthBelowArmhole ?? 0) / 2,
      y - (back.bodiceHeightUntilArmhole ?? 0),
    );
    context.lineTo(
      canvasCenter + (back.widthBelowArmhole ?? 0) / 2,
      y - (back.bodiceHeightUntilArmhole ?? 0),
    );
    context.lineTo(canvasCenter + (back.hemWidth ?? 0) / 2, y);
    context.closePath();
    context.stroke();

    y -= back.bodiceHeightUntilArmhole ?? 0;

    context.beginPath();
    context.moveTo(
      canvasCenter -
        (back.widthBelowArmhole ?? 0) / 2 +
        (back.widthOfDecForArmhole ?? 0) / 2,
      y,
    );
    context.lineTo(
      canvasCenter - (back.widthBetweenArmholes ?? 0) / 2,
      y - (back.bottomArmholeHeight ?? 0),
    );
    context.lineTo(
      canvasCenter + (back.widthBetweenArmholes ?? 0) / 2,
      y - (back.bottomArmholeHeight ?? 0),
    );
    context.lineTo(
      canvasCenter +
        (back.widthBelowArmhole ?? 0) / 2 -
        (back.widthOfDecForArmhole ?? 0) / 2,
      y,
    );
    context.closePath();
    context.stroke();

    y -= back.bottomArmholeHeight ?? 0;

    context.strokeRect(
      canvasCenter - (back.widthBetweenArmholes ?? 0) / 2,
      y - (back.heightBetweenArmholes ?? 0),
      back.widthBetweenArmholes ?? 0,
      back.heightBetweenArmholes ?? 0,
    );

    y -= back.heightBetweenArmholes ?? 0;

    context.beginPath();
    context.moveTo(canvasCenter - (back.widthBetweenArmholes ?? 0) / 2, y);
    context.lineTo(
      canvasCenter - (back.neckWidth ?? 0) / 2,
      y - (back.heightAtShoulders ?? 0),
    );
    context.lineTo(
      canvasCenter + (back.neckWidth ?? 0) / 2,
      y - (back.heightAtShoulders ?? 0),
    );
    context.lineTo(canvasCenter + (back.widthBetweenArmholes ?? 0) / 2, y);
    context.closePath();
    context.stroke();
  }

  return (
    <canvas ref={canvasRef} width={canvasCenter * 2} height={canvasHeight} />
  );
};
