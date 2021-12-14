import * as React from 'react';
import { Path, Project } from 'paper';
import { ShapeRendererProps } from '../../../store/project/project.model';
import { getPoints } from './bezier.selectors';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store.model';
import { Point } from 'paper/dist/paper-core';

export const BezierPreview: React.FC<ShapeRendererProps> = (props) => {
  const [canvas, onRefChange] = React.useState<HTMLCanvasElement | null>(null);

  const points = useSelector((state: AppState) => getPoints(state, props));

  if (canvas) {
    new Project(canvas);
    const path = new Path();

    points?.forEach((point) => {
      path.add(new Point(point));
    });

    path.smooth();
    // @ts-ignore
    path.strokeColor = 'black';

    path.curves
      .map(({ handle1, handle2 }) => [handle1, handle2])
      .map((handles, segment) =>
        handles.map(({ x, y }, handle) =>
          console.log({ segment, handle, x, y }),
        ),
      );

    // path.curves[0].handle2 = new Point(0, 0);
    // path.curves[1].handle1 = new Point(0, 0);
  }

  return <canvas ref={onRefChange} />;
};
