import React, { FunctionComponent } from 'react';
import { LabeledNumberInput } from '../../../components/labeledInput/LabeledNumberInput';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store.model';
import { P1295Measurements } from '../p1295.model';
import { Dispatch } from 'redux';
import { projectUpdateMeasurements } from '../../../store/project/project.actions';
import {
  getBodiceHeightUntilArmhole,
  getBottomArmholeHeight,
  getHeightBetweenArmholes,
  getHemHeight,
  getHemWidth,
  getWidthBelowArmhole,
  getWidthOfDecForArmhole,
} from '../selectors/p1295.measurements.selectors';
import { PatternProps } from '../../../store/pattern/pattern.model';

interface ConnectedState {
  hemWidth: number | undefined;
  hemHeight: number | undefined;
  widthBelowArmhole: number | undefined;
  bodiceHeightUntilArmhole: number | undefined;
  widthOfDecForArmhole: number | undefined;
  bottomArmholeHeight: number | undefined;
  heightBetweenArmholes: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  hemWidth: getHemWidth(state, ownProps),
  hemHeight: getHemHeight(state, ownProps),
  widthBelowArmhole: getWidthBelowArmhole(state, ownProps),
  bodiceHeightUntilArmhole: getBodiceHeightUntilArmhole(state, ownProps),
  widthOfDecForArmhole: getWidthOfDecForArmhole(state, ownProps),
  bottomArmholeHeight: getBottomArmholeHeight(state, ownProps),
  heightBetweenArmholes: getHeightBetweenArmholes(state, ownProps),
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

const SharedMeasurementInput_: FunctionComponent<
  ConnectedState & ConnectedDispatch
> = ({
  hemWidth,
  hemHeight,
  widthBelowArmhole,
  bodiceHeightUntilArmhole,
  widthOfDecForArmhole,
  bottomArmholeHeight,
  heightBetweenArmholes,
  updateMeasurements,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateMeasurements({ [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="hemWidth"
        placeholder={53}
        onChange={onChange}
        value={hemWidth ?? ''}
      >
        Width at hem
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="hemHeight"
        placeholder={4}
        onChange={onChange}
        value={hemHeight ?? ''}
      >
        Hem height
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="widthBelowArmhole"
        placeholder={57}
        onChange={onChange}
        value={widthBelowArmhole ?? ''}
      >
        Width below armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="bodiceHeightUntilArmhole"
        placeholder={40}
        onChange={onChange}
        value={bodiceHeightUntilArmhole ?? ''}
      >
        Bodice height until armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="widthOfDecForArmhole"
        placeholder={1.5}
        onChange={onChange}
        value={widthOfDecForArmhole ?? ''}
      >
        Width of cast off for armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="bottomArmholeHeight"
        placeholder={8}
        onChange={onChange}
        value={bottomArmholeHeight ?? ''}
      >
        Height of bottom armhole
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="heightBetweenArmholes"
        placeholder={9}
        onChange={onChange}
        value={heightBetweenArmholes ?? ''}
      >
        Height between armholes
      </LabeledNumberInput>
    </>
  );
};

export const SharedMeasurementInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SharedMeasurementInput_);
