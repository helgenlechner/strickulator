import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNumberOfSwatchRows,
  getNumberOfSwatchStitches,
  getSwatchHeight,
  getSwatchWidth,
} from '../../patterns/p1295/selectors/p1295.swatch.selectors';
import { projectUpdateSwatch } from '../../store/project/project.actions';
import { LabeledNumberInput } from '../labeledInput/LabeledNumberInput';

export const SwatchInput: FunctionComponent = () => {
  const numberOfStitches = useSelector(getNumberOfSwatchStitches);
  const numberOfRows = useSelector(getNumberOfSwatchRows);
  const width = useSelector(getSwatchWidth);
  const height = useSelector(getSwatchHeight);
  const dispatch = useDispatch();

  const onChange = (key: string, value: number | undefined) => {
    dispatch(projectUpdateSwatch('0', { [key]: value }));
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
