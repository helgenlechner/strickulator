import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../helpers/pluralize';
import { Slope } from '../../helpers/slope';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';

const styles = require('./SlopeDescription.module.css');

interface Props {
  numberOfRows: number | undefined;
  slope: Slope | undefined;
  manipulationLocation?: string;
}

export const SlopeDescription: FunctionComponent<Props> = ({
  numberOfRows,
  slope,
  manipulationLocation = 'on either end',
}) => {
  if (slope && 'pattern' in slope) {
    return (
      <>
        Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,{' '}
        {slope?.type} <HighlightedValue>{slope?.delta}</HighlightedValue>{' '}
        {pluralizeStitch(slope?.delta)} in total {manipulationLocation}{' '}
        according to the following pattern:
        <ul className={styles.pattern}>
          {Object.entries(slope.pattern).map((entry) => (
            <li key={entry[0]}>
              RC {entry[0]}: {entry[1]}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,{' '}
      {slope?.type}{' '}
      <HighlightedValue>{slope?.numberOfStitches}</HighlightedValue>{' '}
      {pluralizeStitch(slope?.numberOfStitches)} {manipulationLocation} every{' '}
      <HighlightedValue>{slope?.numberOfRows}</HighlightedValue> rows.{' '}
    </>
  );
};
