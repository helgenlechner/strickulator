import * as React from 'react';
import { CanvasContext } from '../../../context/canvas.context';
import { Slope } from '../../../helpers/slope';
import { Text } from '../../../components/canvas/Text';
import { Rotate } from '../../../components/canvas/Rotate';
import { Polygon } from '../../../components/canvas/Polygon';
import { Translate } from '../../../components/canvas/Translate';
import { ResetTransformation } from '../../../components/canvas/ResetTransformation';

interface Props {
  slope: Slope | undefined;
  x: number;
  y: number;
  patternPieceWidth: number;
}

export const SlopeDescription: React.FC<Props> = ({
  slope,
  x,
  y,
  patternPieceWidth,
}) => {
  const context = React.useContext(CanvasContext);

  if (!slope || !context) {
    return null;
  }

  if (slope.delta === 0) {
    return null;
  }

  if ('pattern' in slope) {
    const totalHeight = 18 * Object.keys(slope.pattern).length;
    console.log(
      Object.entries(slope.pattern).map(
        ([rc, delta]) =>
          `RC\u2009${rc}: ${slope.type === 'decreasing' ? '-' : '+'}${delta}`,
      ),
    );
    return (
      <>
        {Object.entries(slope.pattern).map(([rc, delta], index) => (
          <Text
            key={rc}
            content={`RC\u2009${rc}: ${
              slope.type === 'decreasing' ? '-' : '+'
            }${delta}`}
            x={50 + patternPieceWidth}
            y={18 * (index + 1) + (y - totalHeight / 2)}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Translate x={x} y={y} />
      <Rotate degrees={45} />
      <Polygon
        points={[
          { x, y },
          { x: x + 3, y: y + 3 },
        ]}
      />
      <Text
        content={`${slope.type === 'decreasing' ? '-' : '+'}${
          slope.numberOfRows / slope.rowInterval
        }\u00d7${slope.stitchDelta}\u2009\u00b7\u2009RC${slope.rowInterval}`}
        x={0}
        y={0}
      />
      <ResetTransformation />
    </>
  );
};
