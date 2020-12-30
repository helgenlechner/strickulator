import React, { FunctionComponent } from 'react';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store.model';
import { ProjectId } from '../../../store/project/project.model';
import { P1295Measurements } from '../p1295.model';
import { Dispatch } from 'redux';
import { projectUpdateMeasurements } from '../../../store/project/project.actions';
import {
  getSleeveHemHeight,
  getUnderarmToSleeveHead,
  getUnderarmWidth,
  getWristToUnderarm,
  getWristWidth,
} from '../selectors/p1295.measurements.selectors';

interface ConnectedState {
  wristWidth: number | undefined;
  hemHeight: number | undefined;
  underarmWidth: number | undefined;
  wristToUnderarm: number | undefined;
  underarmToSleeveHead: number | undefined;
}

const mapStateToProps = (state: AppState): ConnectedState => ({
  wristWidth: getWristWidth(state),
  hemHeight: getSleeveHemHeight(state),
  underarmWidth: getUnderarmWidth(state),
  wristToUnderarm: getWristToUnderarm(state),
  underarmToSleeveHead: getUnderarmToSleeveHead(state),
});

interface ConnectedDispatch {
  updateMeasurements: (
    projectId: ProjectId,
    measurements: Partial<P1295Measurements>,
  ) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  updateMeasurements: (projectId, measurements) =>
    dispatch(projectUpdateMeasurements(projectId, measurements)),
});

const SleeveInput_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  wristWidth,
  hemHeight,
  wristToUnderarm: underarmToWrist,
  underarmToSleeveHead,
  underarmWidth,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements('0', { [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="wristWidth"
        placeholder={28}
        onChange={onChange}
        value={wristWidth ?? ''}
      >
        Width at wrist
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="sleeveHemHeight"
        placeholder={6.5}
        onChange={onChange}
        value={hemHeight ?? ''}
      >
        Hem height
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmWidth"
        placeholder={41}
        onChange={onChange}
        value={underarmWidth ?? ''}
      >
        Underarm width
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmToWrist"
        placeholder={46}
        onChange={onChange}
        value={underarmToWrist ?? ''}
      >
        Length from wrist to underarm
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="underarmToSleeveHead"
        placeholder={17}
        onChange={onChange}
        value={underarmToSleeveHead ?? ''}
      >
        Length from underarm to sleevehead
      </LabeledNumberInput>
    </>
  );
};

export const SleeveInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SleeveInput_);
