import { FunctionComponent, useState } from 'react';
import { drawPolygon } from '../../helpers/drawPolygon';
import { useHeight, useWidth } from '../../helpers/preview';
import {
  getNumberOfPalmRows,
  getNumberOfHandStitches,
  getNumberOfThumbRootRows,
  getNumberOfThumbStitches,
  getNumberOfTipRows,
  getNumberOfStitchesAtTip,
  getNumberOfThumbRows,
  getNumberOfIndexFingerSideTipRows,
  getNumberOfStitchesToDecreaseAtIndexSide,
  getNumberOfPinkieSideTipRows,
  getNumberOfStitchesToDecreaseAtPinkieSide,
} from './selectors/mittens.directions.selectors';

export const OuterPreview: FunctionComponent = () => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const handWidth = useWidth(getNumberOfHandStitches);
  const thumbWidth = useWidth(getNumberOfThumbStitches);
  const thumbRootHeight = useHeight(getNumberOfThumbRootRows);
  const palmHeight = useHeight(getNumberOfPalmRows);
  const tipHeight = useHeight(getNumberOfTipRows);
  const tipWidth = useWidth(getNumberOfStitchesAtTip);
  const thumbHeight = useHeight(getNumberOfThumbRows);
  const indexFingerSideTipHeight = useHeight(getNumberOfIndexFingerSideTipRows);
  const indexFingerSideTipWidth = useWidth(
    getNumberOfStitchesToDecreaseAtIndexSide,
  );
  const pinkieSideTipHeight = useHeight(getNumberOfPinkieSideTipRows);
  const pinkieSideTipWidth = useWidth(
    getNumberOfStitchesToDecreaseAtPinkieSide,
  );

  if (
    !handWidth ||
    !thumbWidth ||
    !thumbRootHeight ||
    !palmHeight ||
    !tipHeight ||
    !tipWidth ||
    !thumbHeight ||
    !indexFingerSideTipHeight ||
    !indexFingerSideTipWidth ||
    !pinkieSideTipHeight ||
    !pinkieSideTipWidth
  ) {
    return null;
  }

  const canvasCenter = Math.ceil(handWidth + thumbWidth + 2);
  const canvasHeight = Math.ceil(thumbRootHeight + palmHeight + tipHeight + 2);

  const context = canvasRef?.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvasCenter * 2, canvasHeight);

    context.strokeStyle = 'lightgray';

    context.strokeRect(canvasCenter, 0, 1, canvasHeight);

    context.strokeStyle = 'black';

    context.font = '16px sans-serif';

    let y = canvasHeight - 1;

    drawPolygon(context, [
      { x: canvasCenter - handWidth, y },
      { x: canvasCenter - handWidth - thumbWidth, y: y - thumbRootHeight },
      { x: canvasCenter + handWidth + thumbWidth, y: y - thumbRootHeight },
      { x: canvasCenter + handWidth, y },
    ]);
    context.fillText('B', canvasCenter + 3, y - 3);

    y -= thumbRootHeight;

    context.strokeRect(
      canvasCenter - handWidth,
      y - palmHeight,
      handWidth * 2,
      palmHeight,
    );
    context.fillText('C', canvasCenter + 3, y - 3);

    y -= palmHeight;

    drawPolygon(context, [
      { x: canvasCenter - handWidth, y },
      {
        x: canvasCenter - handWidth,
        y: y - (pinkieSideTipHeight - indexFingerSideTipHeight),
      },
      {
        x: canvasCenter - (handWidth - indexFingerSideTipWidth),
        y: y - indexFingerSideTipHeight,
      },
      { x: canvasCenter - pinkieSideTipWidth, y: y - indexFingerSideTipHeight },
      { x: canvasCenter, y },
    ]);

    drawPolygon(context, [
      { x: canvasCenter + handWidth, y },
      {
        x: canvasCenter + handWidth,
        y: y - (pinkieSideTipHeight - indexFingerSideTipHeight),
      },
      {
        x: canvasCenter + (handWidth - indexFingerSideTipWidth),
        y: y - indexFingerSideTipHeight,
      },
      { x: canvasCenter + pinkieSideTipWidth, y: y - indexFingerSideTipHeight },
      { x: canvasCenter, y },
    ]);
    context.fillText('D', canvasCenter + 3, y - 3);

    y = canvasHeight - thumbRootHeight - 1;

    context.strokeRect(
      canvasCenter - handWidth - thumbWidth,
      y - thumbHeight,
      thumbWidth,
      thumbHeight,
    );
    context.strokeRect(
      canvasCenter + handWidth,
      y - thumbHeight,
      thumbWidth,
      thumbHeight,
    );
    context.fillText('E', canvasCenter - handWidth - thumbWidth + 2, y - 3);
  }

  return (
    <div>
      <canvas
        ref={setCanvasRef}
        width={canvasCenter * 2}
        height={canvasHeight}
      />
    </div>
  );
};
