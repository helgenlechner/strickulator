import * as React from 'react';
import { connect } from 'react-redux';
import { ArrowHead } from '../../../components/canvas/ArrowHead';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { Canvas } from '../../../components/canvas/Canvas';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { LineDash } from '../../../components/canvas/LineDash';
import { Polygon } from '../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import { leftHalfOfPattern, PREVIEW_FACTOR, topMargin } from '../custom.model';
import {
  getHeight,
  getNumberOfStitches,
  getNumberOfRows,
  getWidth,
} from '../store/custom.rectangle.selectors';
import styles from './Preview.module.css';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

interface ConnectedState {
  width: number | undefined;
  height: number | undefined;
  numberOfStitches: number | undefined;
  numberOfRows: number | undefined;
}

const mapStateToProps = (state: AppState, props: Props): ConnectedState => ({
  width: getWidth(state, props),
  height: getHeight(state, props),
  numberOfStitches: getNumberOfStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
});

const RectanglePreview_: React.FunctionComponent<Props & ConnectedState> = ({
  width,
  height,
  numberOfStitches,
  numberOfRows,
}) => {
  if (!width || !height) {
    return null;
  }

  const canvasWidth = 22 + (width * PREVIEW_FACTOR) / 2;
  const canvasHeight = height * PREVIEW_FACTOR + 22;

  const previewWidth = (width * PREVIEW_FACTOR) / 2;
  const previewHeight = height * PREVIEW_FACTOR;

  return (
    <div className={styles.container}>
      <Canvas width={canvasWidth} height={canvasHeight}>
        <ClearRect width={canvasWidth} height={canvasHeight} />
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
            { x: 10, y: 10 },
            { x: previewWidth + 20, y: 10 },
            { x: previewWidth + 20, y: previewHeight + 10 },
            { x: 10, y: previewHeight + 10 },
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
      <p className={styles.bottomLabel} style={{ maxWidth: canvasWidth }}>
        {numberOfStitches}&times;2 = {width}&#8239;cm
      </p>
    </div>
  );
};

export const RectanglePreview = connect(mapStateToProps)(RectanglePreview_);
