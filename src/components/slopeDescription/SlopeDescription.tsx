import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../helpers/pluralize';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';

interface Props {
  numberOfRows: number | undefined;
  slope:
    | { numberOfRows: number; numberOfStitches: number; excess?: number }
    | undefined;
  isDecrease?: boolean;
}

export const SlopeDescription: FunctionComponent<Props> = ({
  numberOfRows,
  slope,
  isDecrease = true,
}) => {
  return (
    <>
      Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,
      {isDecrease ? ' decreasing' : ' increasing'}{' '}
      <HighlightedValue>{slope?.numberOfStitches}</HighlightedValue>{' '}
      {pluralizeStitch(slope?.numberOfStitches)} on either end every{' '}
      <HighlightedValue>{slope?.numberOfRows}</HighlightedValue> rows.{' '}
      {slope?.excess && ` Excess: ${slope?.excess}`}
    </>
  );
};
