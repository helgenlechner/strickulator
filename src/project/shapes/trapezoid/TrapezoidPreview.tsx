import * as React from 'react';
import { connect } from 'react-redux';
import { Slope } from '../../../helpers/slope';
import { AppState } from '../../../store/store.model';
import {
  getBottomWidth,
  getHeight,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getSlope,
  getTopWidth,
} from './trapezoid.selectors';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { Polygon } from '../../../components/canvas/Polygon';
import { LineDash } from '../../../components/canvas/LineDash';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { ShapeRendererProps } from '../../../store/project/project.model';
import { Canvas } from '../../../components/canvas/Canvas';
import styles from '../Preview.module.css';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import {
  getIsKnittedInTheRound,
  getScaleFactorForProject,
} from '../../store/custom.project.selectors';
import {
  verticalMargin,
  previewWidth,
  leftHalfOfPattern,
} from '../../../constants/preview';

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  slope: Slope | undefined;
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
  slope: getSlope(state, props),
  scaleFactor: getScaleFactorForProject(state, props),
  doubleRowCount: getIsKnittedInTheRound(state, props),
});

const TrapezoidPreview_: React.FunctionComponent<
  ShapeRendererProps & ConnectedState
> = ({
  bottomWidth,
  topWidth,
  height,
  numberOfBottomStitches,
  numberOfTopStitches,
  numberOfRows,
  slope,
  scaleFactor,
  doubleRowCount,
}) => {
  if (!bottomWidth || !topWidth || !height || !scaleFactor || !numberOfRows) {
    return null;
  }

  const canvasHeight = Math.ceil(height * scaleFactor + verticalMargin * 2);
  const previewBottomWidth = (bottomWidth * scaleFactor) / 2;
  const previewTopWidth = (topWidth * scaleFactor) / 2;
  const previewHeight = height * scaleFactor;

  return (
    <div className={styles.container}>
      <Canvas width={previewWidth} height={canvasHeight}>
        <ClearRect width={previewWidth} height={canvasHeight} />
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
            { x: leftHalfOfPattern / 2, y: verticalMargin },
            {
              x: previewTopWidth + leftHalfOfPattern,
              y: verticalMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern,
              y: previewHeight + verticalMargin,
            },
            { x: leftHalfOfPattern / 2, y: previewHeight + verticalMargin },
          ]}
        />
        <ArrowHead x={leftHalfOfPattern / 2} y={verticalMargin} />
        <ArrowHead
          x={leftHalfOfPattern / 2}
          y={previewHeight + verticalMargin}
        />
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
        <SlopeDescription slope={slope} doubleRowCounts={doubleRowCount} />
      </div>
    </div>
  );
};

export const TrapezoidPreview = connect(mapStateToProps)(TrapezoidPreview_);
