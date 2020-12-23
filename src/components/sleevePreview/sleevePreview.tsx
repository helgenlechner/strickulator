import { FunctionComponent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { drawPolygon } from '../../helpers/drawPolygon';
import { getHeight, getWidth } from '../../helpers/preview';
import { getNumberOfArmholeStitchesToCastOff } from '../../state/sharedMeasurements/sharedMeasurements.selectors';
import {
  getNumberOfRowsForSleeveHem,
  getNumberOfRowsFromSleeveHemToUnderarm,
  getNumberOfRowsFromUnderarmToSleeveHead,
  getNumberOfSleeveHeadStitches,
  getNumberOfStitchesAtUnderarm,
  getNumberOfStitchesAtWrist,
} from '../../state/sleeve/sleeve.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../state/swatch/swatch.selectors';

export const SleevePreview: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const widthOfOneStitch = useRecoilValue(getWidthOfOneStitch);
  const heightOfOneRow = useRecoilValue(getHeightOfOneRow);

  const wristWidth = getWidth(
    useRecoilValue(getNumberOfStitchesAtWrist),
    widthOfOneStitch,
  );
  const wristHeight = getHeight(
    useRecoilValue(getNumberOfRowsForSleeveHem),
    heightOfOneRow,
  );
  const underarmWidth = getWidth(
    useRecoilValue(getNumberOfStitchesAtUnderarm),
    widthOfOneStitch,
  );
  const wristToUnderarmHeight = getHeight(
    useRecoilValue(getNumberOfRowsFromSleeveHemToUnderarm),
    heightOfOneRow,
  );
  const underarmToSleeveHeadHeight = getHeight(
    useRecoilValue(getNumberOfRowsFromUnderarmToSleeveHead),
    heightOfOneRow,
  );
  const widthOfArmholeCastOff = getWidth(
    useRecoilValue(getNumberOfArmholeStitchesToCastOff),
    widthOfOneStitch,
  );
  const widthOfSleeveHead = getWidth(
    useRecoilValue(getNumberOfSleeveHeadStitches),
    widthOfOneStitch,
  );

  if (
    !wristWidth ||
    !wristHeight ||
    !underarmWidth ||
    !wristToUnderarmHeight ||
    !underarmToSleeveHeadHeight ||
    !widthOfArmholeCastOff ||
    !widthOfSleeveHead
  ) {
    return null;
  }

  const canvasCenter = Math.ceil(underarmWidth + 2);
  const canvasHeight = Math.ceil(
    wristHeight + wristToUnderarmHeight + underarmToSleeveHeadHeight + 2,
  );

  const context = canvasRef?.current?.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvasCenter * 2, canvasHeight);

    context.strokeStyle = 'lightgray';

    context.strokeRect(canvasCenter, 0, 1, canvasHeight);

    context.strokeStyle = 'black';

    context.font = '16px sans-serif';

    let y = canvasHeight - wristHeight - 1;

    context.strokeRect(
      canvasCenter - wristWidth,
      y,
      wristWidth * 2,
      wristHeight,
    );
    context.fillText('A', canvasCenter + 3, y + wristHeight - 3);

    drawPolygon(context, [
      { x: canvasCenter - wristWidth, y },
      { x: canvasCenter - underarmWidth, y: y - wristToUnderarmHeight },
      { x: canvasCenter + underarmWidth, y: y - wristToUnderarmHeight },
      { x: canvasCenter + wristWidth, y },
    ]);
    context.fillText('B', canvasCenter + 3, y - 3);

    y -= wristToUnderarmHeight;

    drawPolygon(context, [
      { x: canvasCenter - underarmWidth + widthOfArmholeCastOff, y },
      {
        x: canvasCenter - widthOfSleeveHead,
        y: y - underarmToSleeveHeadHeight,
      },
      {
        x: canvasCenter + widthOfSleeveHead,
        y: y - underarmToSleeveHeadHeight,
      },
      { x: canvasCenter + underarmWidth - widthOfArmholeCastOff, y },
    ]);
    context.fillText('C', canvasCenter + 3, y - 3);
  }

  return (
    <div>
      <canvas ref={canvasRef} width={canvasCenter * 2} height={canvasHeight} />
    </div>
  );
};
