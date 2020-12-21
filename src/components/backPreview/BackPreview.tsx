import { FunctionComponent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
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

  const canvasCenter = Math.max(hemWidth, widthBelowArmhole) + 2;
  const canvasHeight =
    hemHeight +
    heightBelowArmhole +
    heightOfBottomArmhole +
    heightBetweenArmholes +
    heightBelowNeck +
    2;

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

    context.beginPath();
    context.moveTo(canvasCenter - hemWidth, y);
    context.lineTo(canvasCenter - widthBelowArmhole, y - heightBelowArmhole);
    context.lineTo(canvasCenter + widthBelowArmhole, y - heightBelowArmhole);
    context.lineTo(canvasCenter + hemWidth, y);
    context.closePath();
    context.stroke();
    context.fillText('B', canvasCenter + 3, y - 3);

    y -= heightBelowArmhole;

    context.beginPath();
    context.moveTo(canvasCenter - widthBelowArmhole + widthOfArmholeCastOff, y);
    context.lineTo(
      canvasCenter - widthBetweenArmholes,
      y - heightOfBottomArmhole,
    );
    context.lineTo(
      canvasCenter + widthBetweenArmholes,
      y - heightOfBottomArmhole,
    );
    context.lineTo(canvasCenter + widthBelowArmhole - widthOfArmholeCastOff, y);
    context.closePath();
    context.stroke();
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

    context.beginPath();
    context.moveTo(canvasCenter - widthBetweenArmholes, y);
    context.lineTo(canvasCenter - widthOfNeck, y - heightBelowNeck);
    context.lineTo(canvasCenter + widthOfNeck, y - heightBelowNeck);
    context.lineTo(canvasCenter + widthBetweenArmholes, y);
    context.closePath();
    context.stroke();
    context.fillText('E', canvasCenter + 3, y - 3);
  }

  return (
    <canvas ref={canvasRef} width={canvasCenter * 2} height={canvasHeight} />
  );
};
