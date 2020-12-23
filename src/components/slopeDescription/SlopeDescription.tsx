import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../helpers/pluralize';
import { Slope } from '../../helpers/slope';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';

const styles = require('./SlopeDescription.module.css');

interface Props {
  slope: Slope | undefined;
  manipulationLocation?: string;
}

export const SlopeDescription: FunctionComponent<Props> = ({
  slope,
  manipulationLocation = 'on either end',
}) => {
  if (slope && 'pattern' in slope) {
    return (
      <>
        Knit for <HighlightedValue>{slope.numberOfRows}</HighlightedValue> rows,{' '}
        {slope.type} <HighlightedValue>{slope.delta}</HighlightedValue>{' '}
        {pluralizeStitch(slope.delta)} in total {manipulationLocation} according
        to the following pattern:
        <ul className={styles.pattern}>
          {Object.entries(slope.pattern).map((entry) => {
            const formattedCount = `${slope.type === 'increasing' ? '+' : '-'}${
              entry[1]
            }`;

            return (
              <li key={entry[0]}>
                RC {entry[0]}:{' '}
                <span className={styles.count} data-count={formattedCount}>
                  {formattedCount}
                </span>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      Knit for <HighlightedValue>{slope?.numberOfRows}</HighlightedValue> rows,{' '}
      {slope?.type} <HighlightedValue>{slope?.stitchDelta}</HighlightedValue>{' '}
      {pluralizeStitch(slope?.stitchDelta)} {manipulationLocation} every{' '}
      <HighlightedValue>{slope?.rowInterval}</HighlightedValue> rows.{' '}
    </>
  );
};
