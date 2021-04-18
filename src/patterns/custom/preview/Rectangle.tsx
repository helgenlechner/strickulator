import * as React from 'react';
import { connect } from 'react-redux';
import { drawArrowHead } from '../../../helpers/drawArrowHead';
import { drawPolygon } from '../../../helpers/drawPolygon';
import { ProjectId } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import { PREVIEW_FACTOR } from '../custom.model';
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
    context.lineWidth = 2;
    context.font = '16px sans-serif';
    context.textAlign = 'center';
    context.fillStyle = '#242f40';
    context.rotate(0);

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // line at center of pattern piece
    context.strokeStyle = '#aeb2b7';
    context.setLineDash([10, 4]);

    drawPolygon(
      context,
      [
        { x: 20, y: 10 },
        { x: 20, y: previewHeight + 10 },
      ],
      false,
    );
    context.stroke();

    // pattern piece
    context.strokeStyle = '#242f40';
    context.setLineDash([]);

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
