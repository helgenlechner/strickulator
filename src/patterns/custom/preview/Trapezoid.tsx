import * as React from 'react';
import { connect } from 'react-redux';
import { Slope } from '../../../helpers/slope';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import {
  getBottomWidth,
  getHeight,
  getNumberOfBottomStitches,
  getNumberOfRows,
  getNumberOfTopStitches,
  getSlope,
  getTopWidth,
} from '../store/custom.trapezoid.selectors';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { Polygon } from '../../../components/canvas/Polygon';
import { LineDash } from '../../../components/canvas/LineDash';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { leftHalfOfPattern, topMargin } from '../custom.model';
import { Canvas } from '../../../components/canvas/Canvas';
import styles from './Preview.module.css';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';

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
  slope: Slope | undefined;
}

const mapStateToProps = (state: AppState, props: Props): ConnectedState => ({
  bottomWidth: getBottomWidth(state, props),
  topWidth: getTopWidth(state, props),
  height: getHeight(state, props),
  numberOfBottomStitches: getNumberOfBottomStitches(state, props),
  numberOfTopStitches: getNumberOfTopStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
  slope: getSlope(state, props),
});

const TrapezoidPreview_: React.FunctionComponent<Props & ConnectedState> = ({
  bottomWidth = 0,
  topWidth = 0,
  height = 0,
  numberOfBottomStitches,
  numberOfTopStitches,
  numberOfRows,
  slope,
}) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(600);

  if (bottomWidth === 0 || topWidth === 0 || height === 0) {
    return null;
  }

  const onContainerRefChange = (ref: HTMLDivElement | null) => {
    if (!ref) {
      return;
    }

    setContainerWidth(Math.min(ref.clientWidth, 600));
  };

  const scaleFactor =
    containerWidth / (Math.max(bottomWidth, topWidth) / 2 + leftHalfOfPattern);

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
