import { FunctionComponent, useState } from 'react';
import { drawPolygon } from '../../../helpers/drawPolygon';
import { useHeight, useWidth } from '../../../helpers/preview';
import {
  getBackNumberOfRowsBelowNeck,
  getBackNumberOfStitchesBetweenArmholes,
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtNeck,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStraightRowsBetweenArmholes,
} from '../selectors/p1295.directions.selectors';

export const BackPreview: FunctionComponent = () => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const hemWidth = useWidth(getNumberOfHemStitches);
  const hemHeight = useHeight(getNumberOfHemRows);
  const widthBelowArmhole = useWidth(getNumberOfStitchesBelowArmhole);
  const heightBelowArmhole = useHeight(getNumberOfBodiceRows);
  const widthOfArmholeCastOff = useWidth(getNumberOfArmholeStitchesToCastOff);
  const heightOfBottomArmhole = useHeight(getNumberOfRowsOfBottomArmhole);
  const widthBetweenArmholes = useWidth(getBackNumberOfStitchesBetweenArmholes);
  const heightBetweenArmholes = useHeight(
    getNumberOfStraightRowsBetweenArmholes,
  );
  const heightBelowNeck = useHeight(getBackNumberOfRowsBelowNeck);
  const widthOfNeck = useWidth(getNumberOfStitchesAtNeck);

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

  const context = canvasRef?.getContext('2d');

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
      <canvas
        ref={setCanvasRef}
        width={canvasCenter * 2}
        height={canvasHeight}
      />
    </div>
  );
};
