import React, { FunctionComponent } from 'react';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store.model';
import {
  getBackHeightAtShoulders,
  getBackWidthBetweenArmholes,
  getNeckWidth,
} from '../selectors/p1295.measurements.selectors';
import { projectUpdateMeasurements } from '../../../store/project/project.actions';
import { Dispatch } from 'redux';
import { ProjectId } from '../../../store/project/project.model';
import { P1295Measurements } from '../p1295.model';

interface ConnectedState {
  widthBetweenArmholes: number | undefined;
  heightAtShoulders: number | undefined;
  neckWidth: number | undefined;
}

const mapStateToProps = (state: AppState): ConnectedState => ({
  widthBetweenArmholes: getBackWidthBetweenArmholes(state),
  heightAtShoulders: getBackHeightAtShoulders(state),
  neckWidth: getNeckWidth(state),
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

const BackInput_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  widthBetweenArmholes,
  heightAtShoulders,
  neckWidth,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements('0', { [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="backWidthBetweenArmholes"
        placeholder={44}
        onChange={onChange}
        value={widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="backHeightAtShoulders"
        placeholder={11}
        onChange={onChange}
        value={heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="neckWidth"
        placeholder={15}
        onChange={onChange}
        value={neckWidth ?? ''}
      >
        Neck width
      </LabeledNumberInput>
    </>
  );
};

export const BackInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackInput_);
