import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { projectUpdateStepMeasurement } from '../../../store/project/project.actions';
import { ShapeRendererProps } from '../../../store/project/project.model';
import { AppState } from '../../../store/store.model';
import { getPoints } from './bezier.selectors';

export const BezierInput: React.FC<ShapeRendererProps> = (props) => {
  const points = useSelector((state: AppState) => getPoints(state, props)) || [
    { x: 0, y: 0 },
  ];

  const dispatch = useDispatch();

  const onChange = (index: number, key: string, value: number | undefined) => {
    const newPoints = points.map((point, i) => {
      if (i !== index) {
        return point;
      }

      return {
        ...point,
        [key]: value,
      };
    });

    dispatch(
      projectUpdateStepMeasurement(
        props.projectId,
        props.patternPieceIndex,
        props.stepIndex,
        'points',
        // @ts-expect-error
        newPoints,
      ),
    );
  };

  const onAddPoint = () => {
    dispatch(
      projectUpdateStepMeasurement(
        props.projectId,
        props.patternPieceIndex,
        props.stepIndex,
        'points',
        // @ts-expect-error
        [...points, { x: 0, y: 0 }],
      ),
    );
  };

  return (
    <>
      {points.map((point, index) => (
        <React.Fragment key={index}>
          <LabeledNumberInput
            name="x"
            value={point.x}
            onChange={(key, value) => onChange(index, key, value)}
          >
            {`Point ${index + 1} X`}
          </LabeledNumberInput>
          <LabeledNumberInput
            name="y"
            value={point.y}
            onChange={(key, value) => onChange(index, key, value)}
          >
            {`Point ${index + 1} Y`}
          </LabeledNumberInput>
        </React.Fragment>
      ))}
      <button onClick={onAddPoint}>Add Point</button>
    </>
  );
};
