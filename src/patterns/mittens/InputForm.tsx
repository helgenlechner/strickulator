import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LabeledNumberInput } from '../../components/labeledInput/LabeledNumberInput';
import { PatternProps } from '../../store/pattern/pattern.model';
import { projectUpdateMeasurements } from '../../store/project/project.actions';
import { AppState } from '../../store/store.model';
import { MittensMeasuremets } from './mittens.model';
import {
  getHandCircumference,
  getHandLength,
  getCuffHeight,
  getThumbCircumference,
  getThumbLength,
  getThumbRootLength,
  getTipHeight,
} from './selectors/mittens.measurements.selectors';

interface ConnectedState {
  cuffHeight: number | undefined;
  handCircumference: number | undefined;
  thumbCircumference: number | undefined;
  handLength: number | undefined;
  thumbLength: number | undefined;
  thumbRootLength: number | undefined;
  tipHeight: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  cuffHeight: getCuffHeight(state, ownProps),
  handCircumference: getHandCircumference(state, ownProps),
  thumbCircumference: getThumbCircumference(state, ownProps),
  handLength: getHandLength(state, ownProps),
  thumbLength: getThumbLength(state, ownProps),
  thumbRootLength: getThumbRootLength(state, ownProps),
  tipHeight: getTipHeight(state, ownProps),
});

interface ConnectedDispatch {
  updateMeasurements: (measurements: Partial<MittensMeasuremets>) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PatternProps,
): ConnectedDispatch => ({
  updateMeasurements: (measurements) =>
    dispatch(projectUpdateMeasurements(ownProps.projectId, measurements)),
});

const MittensInput_: FunctionComponent<
  PatternProps & ConnectedState & ConnectedDispatch
> = ({
  cuffHeight,
  handCircumference,
  thumbCircumference,
  handLength,
  thumbLength,
  thumbRootLength,
  tipHeight,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements({ [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="cuffHeight"
        placeholder={9}
        onChange={onChange}
        value={cuffHeight ?? ''}
      >
        Cuff height
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="handCircumference"
        placeholder={9}
        onChange={onChange}
        value={handCircumference ?? ''}
      >
        Hand circumference
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbCircumference"
        placeholder={9}
        onChange={onChange}
        value={thumbCircumference ?? ''}
      >
        Thumb circumference
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="handLength"
        placeholder={9}
        onChange={onChange}
        value={handLength ?? ''}
      >
        Length from wrist to finger tips
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbLength"
        placeholder={9}
        onChange={onChange}
        value={thumbLength ?? ''}
      >
        Thumb length
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbRootLength"
        placeholder={9}
        onChange={onChange}
        value={thumbRootLength ?? ''}
      >
        Thumb root length
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="tipHeight"
        placeholder={9}
        onChange={onChange}
        value={tipHeight ?? ''}
      >
        Height of angled mitten tip
      </LabeledNumberInput>
    </>
  );
};

export const MittensInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MittensInput_);
