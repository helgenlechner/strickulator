import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getNumberOfSwatchRows,
  getNumberOfSwatchStitches,
  getSwatchHeight,
  getSwatchWidth,
} from '../../store/project/project.swatch.selectors';
import {
  projectUpdateNotes,
  projectUpdateSwatch,
} from '../../store/project/project.actions';
import {
  ProjectId,
  Swatch,
  ProjectProps,
} from '../../store/project/project.model';
import { AppState } from '../../store/store.model';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';
import { LabeledTextArea } from '../labeledInput/LabeledTextArea';
import { getProjectNotes } from '../../store/project/project.selectors';

interface ConnectedState {
  numberOfStitches: number | undefined;
  numberOfRows: number | undefined;
  width: number | undefined;
  height: number | undefined;
  notes: string | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ProjectProps,
): ConnectedState => ({
  numberOfStitches: getNumberOfSwatchStitches(state, ownProps),
  numberOfRows: getNumberOfSwatchRows(state, ownProps),
  width: getSwatchWidth(state, ownProps),
  height: getSwatchHeight(state, ownProps),
  notes: getProjectNotes(state, ownProps),
});

interface ConnectedDispatch {
  updateSwatch: (projectId: ProjectId, swatch: Partial<Swatch>) => void;
  updateNotes: (notes: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ProjectProps,
): ConnectedDispatch => ({
  updateSwatch: (projectId, swatch) =>
    dispatch(projectUpdateSwatch(projectId, swatch)),
  updateNotes: (notes) =>
    dispatch(projectUpdateNotes(ownProps.projectId, notes)),
});

const SwatchInput_: FunctionComponent<
  ProjectProps & ConnectedState & ConnectedDispatch
> = ({
  numberOfStitches,
  numberOfRows,
  width,
  height,
  updateSwatch,
  updateNotes,
  projectId,
  notes,
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
      <br />
      <LabeledTextArea
        name="notes"
        placeholder="Stitch size, tension, etc."
        onChange={(name: string, notes: string) => updateNotes(notes)}
        value={notes ?? ''}
      >
        Notes
      </LabeledTextArea>
    </>
  );
};

export const SwatchInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwatchInput_);
