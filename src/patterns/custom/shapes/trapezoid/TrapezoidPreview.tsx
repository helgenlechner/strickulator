import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { Slope } from '../../../../helpers/slope';
import { AppState } from '../../../../store/store.model';
import {
  getBottomWidth,
  getHeight,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getSlope,
  getTopWidth,
} from './trapezoid.selectors';
import { ArrowHead } from '../../../../components/canvas/ArrowHead';
import { Polygon } from '../../../../components/canvas/Polygon';
import { LineDash } from '../../../../components/canvas/LineDash';
import { StrokeStyle } from '../../../../components/canvas/StrokeStyle';
import { BasicSetup } from '../../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../../components/canvas/ClearRect';
import {
  leftHalfOfPattern,
  ShapeRendererProps,
  topMargin,
} from '../../custom.model';
import { Canvas } from '../../../../components/canvas/Canvas';
import styles from '../Preview.module.css';
import { SlopeDescription } from '../../../../components/slopeDescription/SlopeDescription';
import { getWidestWidthForProject } from '../../store/custom.project.selectors';

interface ConnectedState {
  bottomWidth: number | undefined;
  topWidth: number | undefined;
  height: number | undefined;
  numberOfBottomStitches: number | undefined;
  numberOfTopStitches: number | undefined;
  numberOfRows: number | undefined;
  slope: Slope | undefined;
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
  projectId,
}) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(600);
  const widestMeasurement = useSelector((state: AppState) =>
    getWidestWidthForProject(state, { projectId }),
  );

  if (!bottomWidth || !topWidth || !height || !widestMeasurement) {
    return null;
  }

  const onContainerRefChange = (ref: HTMLDivElement | null) => {
    if (!ref) {
      return;
    }

    setContainerWidth(Math.min(ref.clientWidth, 600));
  };

  const scaleFactor =
    containerWidth / (widestMeasurement / 2 + leftHalfOfPattern);

  const canvasHeight = height * scaleFactor + 22;

  const previewBottomWidth = (bottomWidth * scaleFactor) / 2;
  const previewTopWidth = (topWidth * scaleFactor) / 2;
  const previewHeight = height * scaleFactor;

  return (
    <div ref={onContainerRefChange} className={styles.container}>
      <Canvas width={containerWidth} height={canvasHeight}>
        <ClearRect width={containerWidth} height={canvasHeight} />
        <BasicSetup />
        <StrokeStyle value="#aeb2b7" />
        <LineDash value={[10, 4]} />
        <Polygon
          points={[
            { x: leftHalfOfPattern, y: topMargin },
            { x: leftHalfOfPattern, y: previewHeight + topMargin },
          ]}
        />
        <StrokeStyle value="#242f40" />
        <LineDash value={[]} />
        <Polygon
          points={[
            { x: 10, y: topMargin },
            {
              x: previewTopWidth + leftHalfOfPattern,
              y: topMargin,
            },
            {
              x: previewBottomWidth + leftHalfOfPattern,
              y: previewHeight + topMargin,
            },
            { x: 10, y: previewHeight + topMargin },
          ]}
        />
        <ArrowHead x={4} y={topMargin} />
        <ArrowHead x={4} y={previewHeight + topMargin} />
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
        {numberOfTopStitches}&times;2 = {topWidth}&#8239;cm
      </p>
      <p className={styles.rightLabel}>
        <SlopeDescription slope={slope} />
      </p>
    </div>
  );
};

export const TrapezoidPreview = connect(mapStateToProps)(TrapezoidPreview_);
