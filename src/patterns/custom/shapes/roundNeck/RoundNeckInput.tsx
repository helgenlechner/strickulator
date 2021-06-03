import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LabeledNumberInput } from '../../../../components/labeledInput/LabeledNumberInput';
import { AppState } from '../../../../store/store.model';
import { ShapeRendererProps } from '../../custom.model';
import { customProjectUpdateStepMeasurement } from '../../store/custom.actions';
import { getBottomWidth, getHeight, getTopWidth } from './roundNeck.selectors';

export const RoundNeckInput: FunctionComponent<ShapeRendererProps> = (
  props,
) => {
  const bottomWidth = useSelector((state: AppState) =>
    getBottomWidth(state, props),
  );
  const topWidth = useSelector((state: AppState) => getTopWidth(state, props));
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
      <LabeledNumberInput
        name="bottomWidth"
        value={bottomWidth ?? ''}
        onChange={onChange}
      >
        Width at Start
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="topWidth"
        value={topWidth ?? ''}
        onChange={onChange}
      >
        Shoulder Width
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
