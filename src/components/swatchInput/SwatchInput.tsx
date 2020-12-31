import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getNumberOfSwatchRows,
  getNumberOfSwatchStitches,
  getSwatchHeight,
  getSwatchWidth,
} from '../../patterns/p1295/selectors/p1295.swatch.selectors';
import { PatternProps } from '../../store/pattern/pattern.model';
import { projectUpdateSwatch } from '../../store/project/project.actions';
import { ProjectId, Swatch } from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

interface ConnectedState {
  numberOfStitches: number | undefined;
  numberOfRows: number | undefined;
  width: number | undefined;
  height: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  numberOfStitches: getNumberOfSwatchStitches(state, ownProps),
  numberOfRows: getNumberOfSwatchRows(state, ownProps),
  width: getSwatchWidth(state, ownProps),
  height: getSwatchHeight(state, ownProps),
});

interface ConnectedDispatch {
  updateSwatch: (projectId: ProjectId, swatch: Partial<Swatch>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedDispatch => ({
  updateSwatch: (projectId, swatch) =>
    dispatch(projectUpdateSwatch(projectId, swatch)),
});

const SwatchInput_: FunctionComponent<
  PatternProps & ConnectedState & ConnectedDispatch
> = ({
  numberOfStitches,
  numberOfRows,
  width,
  height,
  updateSwatch,
  projectId,
}) => {
  const onChange = (key: string, value: number | undefined) => {
    updateSwatch(projectId, { [key]: value });
  };

  return (
    <>
      <LabeledNumberInput
        name="numberOfStitches"
        placeholder={100}
        onChange={onChange}
        value={numberOfStitches ?? ''}
      >
        Number of Stitches
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="numberOfRows"
        placeholder={100}
        onChange={onChange}
        value={numberOfRows ?? ''}
      >
        Number of Rows
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="width"
        placeholder={33.65}
        onChange={onChange}
        value={width ?? ''}
      >
        Width
      </LabeledNumberInput>
      <br />
      <LabeledNumberInput
        name="height"
        placeholder={24.76}
        onChange={onChange}
        value={height ?? ''}
      >
        Height
      </LabeledNumberInput>
    </>
  );
};

export const SwatchInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwatchInput_);
