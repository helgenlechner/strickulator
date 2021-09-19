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
} from './bottomArmscye.selectors';
import { Slope } from '../../../helpers/slope';
import {
  getHeightOfOneRow,
  getWidthOfOneStitch,
} from '../../../store/project/project.swatch.selectors';
import { Canvas } from '../../../components/canvas/Canvas';
import styles from '../Preview.module.css';
import { ShapeRendererProps } from '../../../store/project/project.model';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { leftHalfOfPattern, verticalMargin } from '../../../constants/preview';
import { getScaleFactorForProject } from '../../../store/project/project.preview.selectors';
import { getIsKnittedInTheRound } from '../../../store/project/project.step.selectors';

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  neckCurve: Slope | undefined;
  widthOfOneStitch: number | undefined;
  heightOfOneRow: number | undefined;
  scaleFactor: number | undefined;
  doubleRowCount: boolean;
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
  doubleRowCount: getIsKnittedInTheRound(state, props),
});

const BottomArmscyePreview_: React.FC<ShapeRendererProps & ConnectedState> = ({
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
  doubleRowCount,
}) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(600);

  if (
    !bottomWidth ||
    !topWidth ||
    !height ||
    !neckCurve ||
    !scaleFactor ||
    !numberOfRows
  ) {
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
  const previewTopWidth = (topWidth * scaleFactor) / 2;
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
              x: leftHalfOfPattern / 2,
              y: verticalMargin + previewHeight,
            },
            {
              x: leftHalfOfPattern + previewBottomWidth,
              y: verticalMargin + previewHeight,
            },
            ...Object.entries(neckCurve.pattern)
              .map(([row, decrease]) => {
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
                      previewBottomWidth -
                      neckCurveDecreasesSoFar * scaleFactor * widthOfOneStitch,
                    y,
                  },
                  {
                    x:
                      leftHalfOfPattern +
                      previewBottomWidth -
                      (decrease + neckCurveDecreasesSoFar) *
                        scaleFactor *
                        widthOfOneStitch,
                    y,
                  },
                ];

                neckCurveDecreasesSoFar += decrease;

                return points;
              })
              .flat(),
            {
              x:
                leftHalfOfPattern +
                previewBottomWidth -
                neckCurveDecreasesSoFar * scaleFactor * widthOfOneStitch,
              y: verticalMargin,
            },
            {
              x: leftHalfOfPattern / 2,
              y: verticalMargin,
            },
          ]}
          closePath={false}
        />
        <ArrowHead
          x={leftHalfOfPattern / 2}
          y={previewHeight + verticalMargin}
        />
        <ArrowHead x={leftHalfOfPattern / 2} y={verticalMargin} />
      </Canvas>
      <p className={styles.leftLabel}>
        {doubleRowCount ? numberOfRows * 2 : numberOfRows}&#8239;R
        <br />
        {height}&#8239;cm
      </p>
      <p className={styles.bottomLabel}>
        {numberOfBottomStitches}&times;2 = {bottomWidth}&#8239;cm
      </p>
      <p className={styles.topLabel}>
        {numberOfTopStitches}&times;2 = {topWidth}&#8239;cm
      </p>
      <div className={styles.rightLabel}>
        <SlopeDescription slope={neckCurve} doubleRowCounts={doubleRowCount} />
      </div>
    </div>
  );
};

export const BottomArmscyePreview = connect(mapStateToProps)(
  BottomArmscyePreview_,
);
