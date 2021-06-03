import * as React from 'react';
import { connect } from 'react-redux';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { LineDash } from '../../../components/canvas/LineDash';
import { Polygon } from '../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import {
  leftHalfOfPattern,
  leftMargin,
  rightMargin,
  topMargin,
} from '../custom.model';
import {
  getBottomWidth,
  getHeight,
  getNeckCurve,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getTopWidth,
} from '../store/custom.roundNeck.selectors';
import { UnevenSlope } from '../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import { Canvas } from '../../../components/canvas/Canvas';
import styles from './Preview.module.css';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  neckCurve: UnevenSlope['pattern'] | undefined;
  widthOfOneStitch: number | undefined;
  heightOfOneRow: number | undefined;
}

const mapStateToProps = (state: AppState, props: Props): ConnectedState => ({
  bottomWidth: getBottomWidth(state, props),
  topWidth: getTopWidth(state, props),
  height: getHeight(state, props),
  numberOfBottomStitches: getNumberOfBottomStitches(state, props),
  numberOfTopStitches: getNumberOfTopStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
  neckCurve: getNeckCurve(state, props),
  widthOfOneStitch: getWidthOfOneStitch(state, props),
  heightOfOneRow: getHeightOfOneRow(state, props),
});

const RoundNeckPreview_: React.FC<Props & ConnectedState> = ({
  bottomWidth = 0,
  topWidth = 0,
  height = 0,
  numberOfBottomStitches,
  numberOfTopStitches,
  numberOfRows,
  neckCurve,
  widthOfOneStitch = 0,
  heightOfOneRow = 0,
}) => {
  const [containerWidth, setContainerWidth] =
    React.useState<number | undefined>(undefined);

  if (bottomWidth === 0 || topWidth === 0 || height === 0 || !neckCurve) {
    return null;
  }

  const onContainerRefChange = (ref: HTMLDivElement | null) => {
    if (!ref || containerWidth !== undefined) {
      return;
    }

    setContainerWidth(Math.min(ref.clientWidth, 600));
  };

  const scaleFactor =
    ((containerWidth ?? 600) - leftMargin - rightMargin) /
    (Math.max(bottomWidth, topWidth) / 2);

  const canvasHeight = height * scaleFactor + 22;

  const previewBottomWidth = (bottomWidth * scaleFactor) / 2;
  const previewTopWidth = topWidth * scaleFactor;
  const previewHeight = height * scaleFactor;

  let neckCurveDecreasesSoFar = 0;

  return (
    <div ref={onContainerRefChange} className={styles.container}>
      <Canvas width={containerWidth} height={canvasHeight}>
        <ClearRect width={containerWidth ?? 600} height={canvasHeight} />
        <BasicSetup />
        <StrokeStyle value="#aeb2b7" />
        <LineDash value={[10, 4]} />
        <Polygon
          points={[
            { x: leftHalfOfPattern + leftMargin, y: topMargin },
            { x: leftHalfOfPattern + leftMargin, y: previewHeight + topMargin },
          ]}
        />
        <StrokeStyle value="#242f40" />
        <LineDash value={[]} />
        <Polygon
          points={[
            {
              x:
                leftMargin +
                leftHalfOfPattern +
                (previewBottomWidth - previewTopWidth),
              y: topMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern + leftMargin,
              y: topMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern + leftMargin,
              y: previewHeight + topMargin,
            },
            { x: 10 + leftMargin, y: previewHeight + topMargin },
            { x: leftHalfOfPattern + leftMargin, y: previewHeight + topMargin },
            ...Object.entries(neckCurve).map(([row, decrease]) => {
              const y = Math.max(
                previewHeight +
                  topMargin -
                  Number(row) * scaleFactor * heightOfOneRow,
                topMargin,
              );

              const points = [
                {
                  x:
                    leftHalfOfPattern +
                    leftMargin +
                    neckCurveDecreasesSoFar * scaleFactor * widthOfOneStitch,
                  y,
                },
                {
                  x:
                    leftHalfOfPattern +
                    leftMargin +
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
        <ArrowHead x={4 + leftMargin} y={previewHeight + topMargin} />
      </Canvas>
      <p className={styles.leftLabel} style={{ maxWidth: canvasHeight }}>
        {numberOfRows}&#8239;R
        <br />
        {height}&#8239;cm
      </p>
      <p className={styles.bottomLabel} style={{ maxWidth: containerWidth }}>
        {numberOfBottomStitches}&times;2 = {bottomWidth}&#8239;cm
      </p>
      <p className={styles.topLabel} style={{ maxWidth: containerWidth }}>
        {numberOfTopStitches} = {topWidth}&#8239;cm
      </p>
    </div>
  );
};

export const RoundNeckPreview = connect(mapStateToProps)(RoundNeckPreview_);
