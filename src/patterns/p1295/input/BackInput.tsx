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
import { P1295Measurements } from '../p1295.model';
import { PatternProps } from '../../../store/pattern/pattern.model';

interface ConnectedState {
  widthBetweenArmholes: number | undefined;
  heightAtShoulders: number | undefined;
  neckWidth: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  widthBetweenArmholes: getBackWidthBetweenArmholes(state, ownProps),
  heightAtShoulders: getBackHeightAtShoulders(state, ownProps),
  neckWidth: getNeckWidth(state, ownProps),
});

interface ConnectedDispatch {
  updateMeasurements: (measurements: Partial<P1295Measurements>) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PatternProps,
): ConnectedDispatch => ({
  updateMeasurements: (measurements) =>
    dispatch(projectUpdateMeasurements(ownProps.projectId, measurements)),
});

const BackInput_: FunctionComponent<
  PatternProps & ConnectedState & ConnectedDispatch
> = ({
  widthBetweenArmholes,
  heightAtShoulders,
  neckWidth,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements({ [key]: value });
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
