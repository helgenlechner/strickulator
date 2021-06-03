import * as React from 'react';
import { connect } from 'react-redux';
import { BasicSetup } from '../../../components/canvas/BasicSetup';
import { ClearRect } from '../../../components/canvas/ClearRect';
import { LineDash } from '../../../components/canvas/LineDash';
import { Polygon } from '../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../components/canvas/StrokeStyle';
import { CanvasContext } from '../../../context/canvas.context';
import { drawArrowHead } from '../../../helpers/drawArrowHead';
import { drawPolygon } from '../../../helpers/drawPolygon';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import {
  leftHalfOfPattern,
  leftMargin,
  PREVIEW_FACTOR,
  topMargin,
} from '../custom.model';
import {
  getHeight,
  getNumberOfStitches,
  getNumberOfRows,
  getWidth,
} from '../store/custom.rectangle.selectors';
import styles from './Rectangle.module.css';

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
  width = 0,
  height = 0,
  numberOfStitches,
  numberOfRows,
}) => {
  const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(
    null,
  );

  if (width === 0 || height === 0) {
    return null;
  }

  const canvasWidth = 22 + (width * PREVIEW_FACTOR) / 2;
  const canvasHeight = height * PREVIEW_FACTOR + 22;

  const previewWidth = (width * PREVIEW_FACTOR) / 2;
  const previewHeight = height * PREVIEW_FACTOR;

  const context = canvasRef?.getContext('2d');

  if (context) {
    drawPolygon(
      context,
      [
        { x: 10, y: 10 },
        { x: previewWidth + 20, y: 10 },
        { x: previewWidth + 20, y: previewHeight + 10 },
        { x: 10, y: previewHeight + 10 },
      ],
      false,
    );
    context.stroke();

    // arrow heads
    drawArrowHead(context, [4, 10]);
    drawArrowHead(context, [4, previewHeight + 10]);
  }

  return (
    <div className={styles.container}>
      <canvas ref={setCanvasRef} width={canvasWidth} height={canvasHeight} />
      <CanvasContext.Provider value={canvasRef?.getContext('2d') ?? undefined}>
        <ClearRect width={canvasWidth} height={canvasHeight} />
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
            { x: 10, y: 10 },
            { x: previewWidth + 20, y: 10 },
            { x: previewWidth + 20, y: previewHeight + 10 },
            { x: 10, y: previewHeight + 10 },
          ]}
        />
      </CanvasContext.Provider>
      <p className={styles.heightLabel} style={{ maxWidth: canvasHeight }}>
        {numberOfRows}&#8239;R
        <br />
        {height}&#8239;cm
      </p>
      <p className={styles.widthLabel} style={{ maxWidth: canvasWidth }}>
        {numberOfStitches}&times;2 = {width}&#8239;cm
      </p>
    </div>
  );
};

export const RectanglePreview = connect(mapStateToProps)(RectanglePreview_);
