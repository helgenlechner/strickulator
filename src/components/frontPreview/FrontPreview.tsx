import { FunctionComponent, useRef } from 'react';
import { drawPolygon } from '../../helpers/drawPolygon';
import { useHeight, useWidth } from '../../helpers/preview';
import { getNumberOfStitchesAtNeck } from '../../state/back/back.selectors';
import {
  getNumberOfLowerBottomArmholeRows,
  getNumberOfNecklineRows,
  getNumberOfRowsAtShoulder,
  getNumberOfStitchesAfterLowerBottomArmholeDecreases,
  getNumberOfStitchesBetweenArmholes,
  getNumberOfStitchesForFrontShoulderCastOff,
} from '../../state/front/front.selectors';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStraightRowsBetweenArmholes,
} from '../../state/sharedMeasurements/sharedMeasurements.selectors';

export const FrontPreview: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hemWidth = useWidth(getNumberOfHemStitches);
  const hemHeight = useHeight(getNumberOfHemRows);
  const widthBelowArmhole = useWidth(getNumberOfStitchesBelowArmhole);
  const heightBelowArmhole = useHeight(getNumberOfBodiceRows);
  const widthOfArmholeCastOff = useWidth(getNumberOfArmholeStitchesToCastOff);
  const heightOfLowerBottomArmhole = useHeight(
    getNumberOfLowerBottomArmholeRows,
  );
  const widthAfterLowerBottomArmholeDecreases = useWidth(
    getNumberOfStitchesAfterLowerBottomArmholeDecreases,
  );
  const heightOfBottomArmhole = useHeight(getNumberOfRowsOfBottomArmhole);
  const widthBetweenArmholes = useWidth(getNumberOfStitchesBetweenArmholes);
  const heightBetweenArmholes = useHeight(
    getNumberOfStraightRowsBetweenArmholes,
  );
  const heightBelowShoulder = useHeight(getNumberOfRowsAtShoulder);
  const widthAtShoulderCastOff = useWidth(
    getNumberOfStitchesForFrontShoulderCastOff,
  );
  const backNecklineWidth = useWidth(getNumberOfStitchesAtNeck);
  const frontNecklineDepth = useHeight(getNumberOfNecklineRows);

  if (
    !hemWidth ||
    !hemHeight ||
    !widthBelowArmhole ||
    !heightBelowArmhole ||
    !widthOfArmholeCastOff ||
    !heightOfBottomArmhole ||
    !widthBetweenArmholes ||
    !heightBetweenArmholes ||
    !heightOfLowerBottomArmhole ||
    !widthAfterLowerBottomArmholeDecreases ||
    !heightBelowShoulder ||
    !widthAtShoulderCastOff ||
    !backNecklineWidth
  ) {
    return null;
  }

  const canvasCenter = Math.ceil(Math.max(hemWidth, widthBelowArmhole) + 2);
  const canvasHeight = Math.ceil(
    hemHeight +
      heightBelowArmhole +
      heightOfBottomArmhole +
      heightBetweenArmholes +
      heightBelowShoulder +
      2,
  );

  const context = canvasRef?.current?.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvasCenter * 2, canvasHeight);

    context.strokeStyle = 'lightgray';

    context.strokeRect(canvasCenter - 1, 0, 2, canvasHeight);

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
      {
        x: canvasCenter - widthAfterLowerBottomArmholeDecreases,
        y: y - heightOfLowerBottomArmhole,
      },
      {
        x: canvasCenter + widthAfterLowerBottomArmholeDecreases,
        y: y - heightOfLowerBottomArmhole,
      },
      { x: canvasCenter + widthBelowArmhole - widthOfArmholeCastOff, y },
    ]);
    context.fillText('C', canvasCenter + 3, y - 3);

    y -= heightOfLowerBottomArmhole;

    drawPolygon(context, [
      {
        x: canvasCenter - widthAfterLowerBottomArmholeDecreases,
        y,
      },
      {
        x: canvasCenter - widthBetweenArmholes,
        y: y - (heightOfBottomArmhole - heightOfLowerBottomArmhole),
      },
      {
        x: canvasCenter + widthBetweenArmholes,
        y: y - (heightOfBottomArmhole - heightOfLowerBottomArmhole),
      },
      {
        x: canvasCenter + widthAfterLowerBottomArmholeDecreases,
        y,
      },
    ]);
    context.fillText('D', canvasCenter + 3, y - 3);

    y -= heightOfBottomArmhole - heightOfLowerBottomArmhole;

    context.strokeRect(
      canvasCenter - widthBetweenArmholes,
      y - heightBetweenArmholes,
      widthBetweenArmholes * 2,
      heightBetweenArmholes,
    );
    context.fillText('E', canvasCenter + 3, y - 3);

    y -= heightBetweenArmholes;

    drawPolygon(context, [
      { x: canvasCenter - widthBetweenArmholes, y },
      {
        x: canvasCenter - widthAtShoulderCastOff - backNecklineWidth,
        y: y - heightBelowShoulder,
      },
      {
        x: canvasCenter - backNecklineWidth,
        y: y - heightBelowShoulder,
      },
      { x: canvasCenter, y: y - heightBelowShoulder + frontNecklineDepth },
      {
        x: canvasCenter + backNecklineWidth,
        y: y - heightBelowShoulder,
      },
      {
        x: canvasCenter + widthAtShoulderCastOff + backNecklineWidth,
        y: y - heightBelowShoulder,
      },
      { x: canvasCenter + widthBetweenArmholes, y },
    ]);
    context.fillText('F', canvasCenter + 3, y - 3);
  }

  return (
    <div>
      <canvas ref={canvasRef} width={canvasCenter * 2} height={canvasHeight} />
    </div>
  );
};
