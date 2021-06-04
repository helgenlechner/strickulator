import * as React from 'react';
import { connect } from 'react-redux';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { LineDash } from '../../../components/canvas/LineDash';
import { Polygon } from '../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { AppState } from '../../../store/store.model';
import {
  getBottomWidth,
  getHeight,
  getNeckCurve,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getTopWidth,
} from './roundNeck.selectors';
import { UnevenSlope } from '../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import { Canvas } from '../../../components/canvas/Canvas';
import styles from '../Preview.module.css';
import {
  ShapeRendererProps,
  leftHalfOfPattern,
  verticalMargin,
} from '../../store/custom.model';
import { getScaleFactorForProject } from '../../store/custom.project.selectors';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  neckCurve: UnevenSlope | undefined;
  widthOfOneStitch: number | undefined;
  heightOfOneRow: number | undefined;
  scaleFactor: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  props: ShapeRendererProps,
): ConnectedState => ({
  bottomWidth: getBottomWidth(state, props),
  topWidth: getTopWidth(state, props),
  height: getHeight(state, props),
  numberOfBottomStitches: getNumberOfBottomStitches(state, props),
  numberOfTopStitches: getNumberOfTopStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
  neckCurve: getNeckCurve(state, props),
  widthOfOneStitch: getWidthOfOneStitch(state, props),
  heightOfOneRow: getHeightOfOneRow(state, props),
  scaleFactor: getScaleFactorForProject(state, props),
});

const RoundNeckPreview_: React.FC<ShapeRendererProps & ConnectedState> = ({
  bottomWidth,
  topWidth,
  height,
  numberOfBottomStitches,
  numberOfTopStitches,
  numberOfRows,
  neckCurve,
  widthOfOneStitch = 0,
  heightOfOneRow = 0,
  scaleFactor,
}) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(600);

  if (!bottomWidth || !topWidth || !height || !neckCurve || !scaleFactor) {
    return null;
  }

  const onContainerRefChange = (ref: HTMLDivElement | null) => {
    if (!ref || containerWidth !== undefined) {
      return;
    }

    setContainerWidth(Math.min(ref.clientWidth, 600));
  };

  const canvasHeight = height * scaleFactor + 22;

  const previewBottomWidth = (bottomWidth * scaleFactor) / 2;
  const previewTopWidth = topWidth * scaleFactor;
  const previewHeight = height * scaleFactor;

  let neckCurveDecreasesSoFar = 0;

  return (
    <div ref={onContainerRefChange} className={styles.container}>
      <Canvas width={containerWidth} height={canvasHeight}>
        <ClearRect width={containerWidth} height={canvasHeight} />
        <BasicSetup />
        <StrokeStyle value="#aeb2b7" />
        <LineDash value={[10, 4]} />
        <Polygon
          points={[
            { x: leftHalfOfPattern, y: verticalMargin },
            { x: leftHalfOfPattern, y: previewHeight + verticalMargin },
          ]}
        />
        <StrokeStyle value="#242f40" />
        <LineDash value={[]} />
        <Polygon
          points={[
            {
              x: leftHalfOfPattern + (previewBottomWidth - previewTopWidth),
              y: verticalMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern,
              y: verticalMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern,
              y: previewHeight + verticalMargin,
            },
            { x: leftHalfOfPattern / 2, y: previewHeight + verticalMargin },
            { x: leftHalfOfPattern, y: previewHeight + verticalMargin },
            ...Object.entries(neckCurve.pattern).map(([row, decrease]) => {
              const y = Math.max(
                previewHeight +
                  verticalMargin -
                  Number(row) * scaleFactor * heightOfOneRow,
                verticalMargin,
              );

              const points = [
                {
                  x:
                    leftHalfOfPattern +
                    neckCurveDecreasesSoFar * scaleFactor * widthOfOneStitch,
                  y,
                },
                {
                  x:
                    leftHalfOfPattern +
                    (decrease + neckCurveDecreasesSoFar) *
                      scaleFactor *
                      widthOfOneStitch,
                  y,
                },
              ];

              neckCurveDecreasesSoFar += decrease;

              return points;
            }),
          ].flat()}
          closePath={true}
        />
        <ArrowHead
          x={leftHalfOfPattern / 2}
          y={previewHeight + verticalMargin}
        />
      </Canvas>
      <p className={styles.leftLabel}>
        {numberOfRows}&#8239;R
        <br />
        {height}&#8239;cm
      </p>
      <p className={styles.bottomLabel}>
        {numberOfBottomStitches}&times;2 = {bottomWidth}&#8239;cm
      </p>
      <p className={styles.topLabel}>
        {numberOfTopStitches} = {topWidth}&#8239;cm
      </p>
      <div className={styles.rightLabel}>
        <SlopeDescription slope={neckCurve} />
      </div>
    </div>
  );
};

export const RoundNeckPreview = connect(mapStateToProps)(RoundNeckPreview_);
