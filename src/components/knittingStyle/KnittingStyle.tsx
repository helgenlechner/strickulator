import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getKnittingStyle } from '../../patterns/p1295/selectors/p1295.knittingStyle.selectors';
import { projectUpdateKnittingStyle } from '../../store/project/project.actions';
import {
  KnittingStyle as KnittingStyleEnum,
  ProjectId,
} from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import { LabeledRadioInput } from '../labeledInput/LabeledRadioInput';

const options = [
  { id: KnittingStyleEnum.flat, label: 'Flat' },
  { id: KnittingStyleEnum.inTheRound, label: 'In the round' },
];

interface ConnectedState {
  knittingStyle: KnittingStyleEnum;
}

const mapStateToProps = (state: AppState): ConnectedState => ({
  knittingStyle: getKnittingStyle(state),
});

interface ConnectedDispatch {
  updateKnittingStyle: (
    projectId: ProjectId,
    knittingStyle: KnittingStyleEnum,
  ) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  updateKnittingStyle: (projectId, measurements) =>
    dispatch(projectUpdateKnittingStyle(projectId, measurements)),
});

const KnittingStyle_: FunctionComponent<ConnectedState & ConnectedDispatch> = ({
  knittingStyle,
  updateKnittingStyle,
}) => {
  const onChange = (value: string | number) => {
    if (typeof value === 'number') {
      updateKnittingStyle('0', value);
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
