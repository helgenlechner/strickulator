import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getKnittingStyle } from '../../patterns/custom/store/custom.project.selectors';
import { PatternProps } from '../../store/pattern/pattern.model';
import { projectUpdateKnittingStyle } from '../../store/project/project.actions';
import { KnittingStyle as KnittingStyleEnum } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import { LabeledRadioInput } from '../labeledInput/LabeledRadioInput';

const options = [
  { id: KnittingStyleEnum.flat, label: 'Flat' },
  { id: KnittingStyleEnum.inTheRound, label: 'In the round' },
];

interface ConnectedState {
  knittingStyle: KnittingStyleEnum;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  knittingStyle: getKnittingStyle(state, ownProps),
});

interface ConnectedDispatch {
  updateKnittingStyle: (knittingStyle: KnittingStyleEnum) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PatternProps,
): ConnectedDispatch => ({
  updateKnittingStyle: (measurements) =>
    dispatch(projectUpdateKnittingStyle(ownProps.projectId, measurements)),
});

const KnittingStyle_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  knittingStyle,
  updateKnittingStyle,
}) => {
  const onChange = (value: string | number) => {
    if (typeof value === 'number') {
      updateKnittingStyle(value);
    }
  };

  return (
    <LabeledRadioInput
      name="flatOrRound"
      options={options}
      onChange={onChange}
      value={knittingStyle}
    />
  );
};

export const KnittingStyle = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KnittingStyle_);
