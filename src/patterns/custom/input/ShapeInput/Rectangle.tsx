import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LabeledNumberInput } from '../../../../components/labeledInput/LabeledNumberInput';
import { ProjectId } from '../../../../store/project/project.model';
import { AppState } from '../../../../store/store.model';
import { customProjectUpdateStepMeasurement } from '../../store/custom.actions';
import { getHeight, getWidth } from '../../store/custom.rectangle.selectors';

interface Props {
  projectId: ProjectId;
  patternPieceIndex: number;
  stepIndex: number;
}

export const RectangleInput: FunctionComponent<Props> = (props) => {
  const width = useSelector((state: AppState) => getWidth(state, props));
  const height = useSelector((state: AppState) => getHeight(state, props));

  const dispatch = useDispatch();

  const onChange = (key: string, value: number | undefined) => {
    dispatch(
      customProjectUpdateStepMeasurement(
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