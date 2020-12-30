import React, { FunctionComponent } from 'react';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store.model';
import { projectUpdateMeasurements } from '../../../store/project/project.actions';
import { Dispatch } from 'redux';
import { P1295Measurements } from '../p1295.model';
import {
  getFrontHeightAtShoulders,
  getFrontWidthBetweenArmholes,
  getNecklineDepth,
} from '../selectors/p1295.measurements.selectors';
import { ProjectId } from '../../../store/project/project.model';

interface ConnectedState {
  widthBetweenArmholes: number | undefined;
  heightAtShoulders: number | undefined;
  necklineDepth: number | undefined;
}

const mapStateToProps = (state: AppState): ConnectedState => ({
  widthBetweenArmholes: getFrontWidthBetweenArmholes(state),
  heightAtShoulders: getFrontHeightAtShoulders(state),
  necklineDepth: getNecklineDepth(state),
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

const FrontInput_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  widthBetweenArmholes,
  heightAtShoulders,
  necklineDepth,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements('0', { [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        placeholder={44}
        name="frontWidthBetweenArmholes"
        onChange={onChange}
        value={widthBetweenArmholes ?? ''}
      >
        Width between armholes
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="frontHeightAtShoulders"
        placeholder={13}
        onChange={onChange}
        value={heightAtShoulders ?? ''}
      >
        Height at shoulders
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="necklineDepth"
        placeholder={25}
        onChange={onChange}
        value={necklineDepth ?? ''}
      >
        Neckline depth
      </LabeledNumberInput>
    </>
  );
};

export const FrontInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontInput_);
