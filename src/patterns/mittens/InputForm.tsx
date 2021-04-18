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
  getTipWidth,
  getIndexFingerSideTipHeight,
  getPinkieSideTipHeight,
} from './selectors/mittens.measurements.selectors';
import thumbLengthIllustration from './assets/thumb-length.jpg';
import thumbRootLengthIllustration from './assets/thumb-root-length.jpg';
import indexFingerSlopeIllustration from './assets/index-finger-slope-height.jpg';
import pinkieSlopeIllustration from './assets/pinkie-slope-height.jpg';

interface ConnectedState {
  cuffHeight: number | undefined;
  handCircumference: number | undefined;
  thumbCircumference: number | undefined;
  handLength: number | undefined;
  thumbLength: number | undefined;
  thumbRootLength: number | undefined;
  tipWidth: number | undefined;
  indexFingerSideTipHeight: number | undefined;
  pinkieSideTipHeight: number | undefined;
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
  tipWidth: getTipWidth(state, ownProps),
  indexFingerSideTipHeight: getIndexFingerSideTipHeight(state, ownProps),
  pinkieSideTipHeight: getPinkieSideTipHeight(state, ownProps),
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
  tipWidth,
  indexFingerSideTipHeight,
  pinkieSideTipHeight,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements({ [key]: value });
  };

  return (
    <>
      <h2>Measurements</h2>
      <LabeledNumberInput
        name="cuffHeight"
        placeholder={5}
        onChange={onChange}
        value={cuffHeight ?? ''}
      >
        Cuff length
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="handCircumference"
        placeholder={20}
        onChange={onChange}
        value={handCircumference ?? ''}
        hint="Circumference of hand at widest point (without thumb)"
      >
        Hand circumference
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbCircumference"
        placeholder={7}
        onChange={onChange}
        value={thumbCircumference ?? ''}
        hint="Circumference of thumb at widest point"
      >
        Thumb circumference
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="handLength"
        placeholder={20}
        onChange={onChange}
        value={handLength ?? ''}
      >
        Length from wrist to finger tips
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbLength"
        placeholder={7}
        onChange={onChange}
        value={thumbLength ?? ''}
        hint="Length of thumb from where it connects to the hand to its tip"
        illustration={thumbLengthIllustration}
      >
        Thumb length
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="thumbRootLength"
        placeholder={6.5}
        onChange={onChange}
        value={thumbRootLength ?? ''}
        hint="Length from the root of the hand to where the thumb splits off. Measure parallel to the four fingers."
        illustration={thumbRootLengthIllustration}
      >
        Thumb root length
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="indexFingerSideTipHeight"
        placeholder={2.5}
        onChange={onChange}
        value={indexFingerSideTipHeight ?? ''}
        hint="Measure by tracing the hand onto a piece of paper and then drawing a rectangle around the fingers. Draw a diagonal line from the longest finger to the index finger. Measure the length from the top of the rectangle to where the diagonal intersects the side of the rectangle."
        illustration={indexFingerSlopeIllustration}
      >
        Length of finger slope at index finger
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="pinkieSideTipHeight"
        placeholder={4.5}
        onChange={onChange}
        value={pinkieSideTipHeight ?? ''}
        hint="Measure by tracing the hand onto a piece of paper and then drawing a rectangle around the fingers. Draw a diagonal line from the longest finger to the pinkie. Measure the length from the top of the rectangle to where the diagonal intersects the side of the rectangle."
        illustration={pinkieSlopeIllustration}
      >
        Length of finger slope at pinkie
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="tipWidth"
        placeholder={1}
        onChange={onChange}
        value={tipWidth ?? ''}
        hint=""
      >
        Width of tip
      </LabeledNumberInput>
    </>
  );
};

export const MittensInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MittensInput_);
