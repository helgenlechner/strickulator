import { FunctionComponent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { drawPolygon } from '../../helpers/drawPolygon';
import { getHeight, getWidth } from '../../helpers/preview';
import {
  getNumberOfRowsBelowNeck,
  getNumberOfStitchesAtNeck,
  getNumberOfStitchesBetweenArmholes,
} from '../../state/back/back.selectors';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStraightRowsBetweenArmholes,
} from '../../state/sharedMeasurements/sharedMeasurements.selectors';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../state/swatch/swatch.selectors';

export const BackPreview: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const widthOfOneStitch = useRecoilValue(getWidthOfOneStitch);
  const heightOfOneRow = useRecoilValue(getHeightOfOneRow);

  const hemWidth = getWidth(
    useRecoilValue(getNumberOfHemStitches),
    widthOfOneStitch,
  );
  const hemHeight = getHeight(
    useRecoilValue(getNumberOfHemRows),
    heightOfOneRow,
  );
  const widthBelowArmhole = getWidth(
    useRecoilValue(getNumberOfStitchesBelowArmhole),
    widthOfOneStitch,
  );
  const heightBelowArmhole = getHeight(
    useRecoilValue(getNumberOfBodiceRows),
    heightOfOneRow,
  );
  const widthOfArmholeCastOff = getWidth(
    useRecoilValue(getNumberOfArmholeStitchesToCastOff),
    widthOfOneStitch,
  );
  const heightOfBottomArmhole = getHeight(
    useRecoilValue(getNumberOfRowsOfBottomArmhole),
    heightOfOneRow,
  );
  const widthBetweenArmholes = getWidth(
    useRecoilValue(getNumberOfStitchesBetweenArmholes),
    widthOfOneStitch,
  );
  const heightBetweenArmholes = getHeight(
    useRecoilValue(getNumberOfStraightRowsBetweenArmholes),
    heightOfOneRow,
  );
  const heightBelowNeck = getHeight(
    useRecoilValue(getNumberOfRowsBelowNeck),
    heightOfOneRow,
  );
  const widthOfNeck = getWidth(
    useRecoilValue(getNumberOfStitchesAtNeck),
    widthOfOneStitch,
  );

  if (
    !hemWidth ||
    !hemHeight ||
    !widthBelowArmhole ||
    !heightBelowArmhole ||
    !widthOfArmholeCastOff ||
    !heightOfBottomArmhole ||
    !widthBetweenArmholes ||
    !heightBetweenArmholes ||
    !heightBelowNeck ||
    !widthOfNeck
  ) {
    return null;
  }

  const canvasCenter = Math.ceil(Math.max(hemWidth, widthBelowArmhole) + 2);
  const canvasHeight = Math.ceil(
    hemHeight +
      heightBelowArmhole +
      heightOfBottomArmhole +
      heightBetweenArmholes +
      heightBelowNeck +
      2,
  );

  const context = canvasRef?.current?.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvasCenter * 2, canvasHeight);

    context.strokeStyle = 'lightgray';

    context.strokeRect(canvasCenter, 0, 1, canvasHeight);

    context.strokeStyle = 'black';

    context.font = '16px sans-serif';

    let y = canvasHeight - hemHeight - 1;

    context.strokeRect(canvasCenter - hemWidth, y, hemWidth * 2, hemHeight);
    context.fillText('A', canvasCenter + 3, y + hemHeight - 3);

    drawPolygon(context, [
      { x: canvasCenter - hemWidth, y },
      { x: canvasCenter - widthBelowArmhole, y: y - heightBelowArmhole },
      { x: canvasCenter + widthBelowArmhole, y: y - heightBelowArmhole },
      { x: canvasCenter + hemWidth, y },
    ]);
    context.fillText('B', canvasCenter + 3, y - 3);

    y -= heightBelowArmhole;

    drawPolygon(context, [
      { x: canvasCenter - widthBelowArmhole + widthOfArmholeCastOff, y },
      { x: canvasCenter - widthBetweenArmholes, y: y - heightOfBottomArmhole },
      { x: canvasCenter + widthBetweenArmholes, y: y - heightOfBottomArmhole },
      { x: canvasCenter + widthBelowArmhole - widthOfArmholeCastOff, y },
    ]);
    context.fillText('C', canvasCenter + 3, y - 3);

    y -= heightOfBottomArmhole;

    context.strokeRect(
      canvasCenter - widthBetweenArmholes,
      y - heightBetweenArmholes,
      widthBetweenArmholes * 2,
      heightBetweenArmholes,
    );
    context.fillText('D', canvasCenter + 3, y - 3);

    y -= heightBetweenArmholes;

    drawPolygon(context, [
      { x: canvasCenter - widthBetweenArmholes, y },
      { x: canvasCenter - widthOfNeck, y: y - heightBelowNeck },
      { x: canvasCenter + widthOfNeck, y: y - heightBelowNeck },
      { x: canvasCenter + widthBetweenArmholes, y },
    ]);
    context.fillText('E', canvasCenter + 3, y - 3);
  }

  return (
    <div>
      <canvas ref={canvasRef} width={canvasCenter * 2} height={canvasHeight} />
    </div>
  );
};
