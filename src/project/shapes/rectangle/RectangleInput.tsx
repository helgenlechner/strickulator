import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { AppState } from '../../../store/store.model';
import { ShapeRendererProps } from '../../../store/project/project.model';
import { getHeight, getWidth } from './rectangle.selectors';
import { projectUpdateStepMeasurement } from '../../../store/project/project.actions';

export const RectangleInput: FunctionComponent<ShapeRendererProps> = (
  props,
) => {
  const width = useSelector((state: AppState) => getWidth(state, props));
  const height = useSelector((state: AppState) => getHeight(state, props));

  const dispatch = useDispatch();

  const onChange = (key: string, value: number | undefined) => {
    dispatch(
      projectUpdateStepMeasurement(
        props.projectId,
        props.patternPieceIndex,
        props.stepIndex,
        key,
        value,
      ),
    );
  };

  return (
    <>
      <LabeledNumberInput name="width" value={width ?? ''} onChange={onChange}>
        Width
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="height"
        value={height ?? ''}
        onChange={onChange}
      >
        Height
      </LabeledNumberInput>
    </>
  );
};
