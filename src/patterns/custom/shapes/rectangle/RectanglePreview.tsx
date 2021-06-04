import * as React from 'react';
import { connect } from 'react-redux';
import { ArrowHead } from '../../../../components/canvas/ArrowHead';
import { BasicSetup } from '../../../../components/canvas/BasicSetup';
import { Canvas } from '../../../../components/canvas/Canvas';
import { ClearRect } from '../../../../components/canvas/ClearRect';
import { LineDash } from '../../../../components/canvas/LineDash';
import { Polygon } from '../../../../components/canvas/Polygon';
import { StrokeStyle } from '../../../../components/canvas/StrokeStyle';
import { AppState } from '../../../../store/store.model';
import {
  leftHalfOfPattern,
  previewWidth,
  ShapeRendererProps,
  verticalMargin,
} from '../../custom.model';
import {
  getHeight,
  getNumberOfStitches,
  getNumberOfRows,
  getWidth,
} from './rectangle.selectors';
import styles from '../Preview.module.css';
import { getScaleFactorForProject } from '../../store/custom.project.selectors';

interface ConnectedState {
  width: number | undefined;
  height: number | undefined;
  numberOfStitches: number | undefined;
  numberOfRows: number | undefined;
  scaleFactor: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  props: ShapeRendererProps,
): ConnectedState => ({
  width: getWidth(state, props),
  height: getHeight(state, props),
  numberOfStitches: getNumberOfStitches(state, props),
  numberOfRows: getNumberOfRows(state, props),
  scaleFactor: getScaleFactorForProject(state, props),
});

const RectanglePreview_: React.FunctionComponent<
  ShapeRendererProps & ConnectedState
> = ({ width, height, numberOfStitches, numberOfRows, scaleFactor }) => {
  if (!width || !height || !scaleFactor) {
    return null;
  }

  const canvasHeight = Math.ceil(height * scaleFactor + verticalMargin * 2);

  const previewRectangleHeight = height * scaleFactor;
  const previewRectangleWidth = (width / 2) * scaleFactor;

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
            {
              x: leftHalfOfPattern,
              y: previewRectangleHeight + verticalMargin,
            },
          ]}
        />
        <StrokeStyle value="#242f40" />
        <LineDash value={[]} />
        <Polygon
          points={[
            { x: leftHalfOfPattern / 2, y: verticalMargin },
            { x: previewRectangleWidth + leftHalfOfPattern, y: verticalMargin },
            {
              x: previewRectangleWidth + leftHalfOfPattern,
              y: previewRectangleHeight + verticalMargin,
            },
            {
              x: leftHalfOfPattern / 2,
              y: previewRectangleHeight + verticalMargin,
            },
          ]}
        />
        <ArrowHead x={leftHalfOfPattern / 2} y={verticalMargin} />
        <ArrowHead
          x={leftHalfOfPattern / 2}
          y={previewRectangleHeight + verticalMargin}
        />
      </Canvas>
      <p className={styles.leftLabel}>
        {numberOfRows}&#8239;R
        <br />
        {height}&#8239;cm
      </p>
      <p className={styles.bottomLabel}>
        {numberOfStitches}&times;2 = {width}&#8239;cm
      </p>
    </div>
  );
};

export const RectanglePreview = connect(mapStateToProps)(RectanglePreview_);