import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../helpers/pluralize';
import { Slope } from '../../helpers/slope';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';

const styles = require('./SlopeDescription.module.css');

interface Props {
  slope: Slope | undefined;
  manipulationLocation?: string;
  duplicateRowCounts?: boolean;
}

export const SlopeDescription: FunctionComponent<Props> = ({
  slope,
  manipulationLocation = 'on either end',
  duplicateRowCounts = false,
}) => {
  const numberOfRows = slope
    ? duplicateRowCounts
      ? slope.numberOfRows * 2
      : slope.numberOfRows
    : undefined;

  if (slope && 'pattern' in slope) {
    return (
      <>
        Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,{' '}
        {slope.type} the stated number of stitches {manipulationLocation}{' '}
        according to the following pattern:
        <ul className={styles.pattern}>
          {Object.entries(slope.pattern).map((entry) => {
            const formattedCount = `${slope.type === 'increasing' ? '+' : '-'}${
              entry[1]
            }`;
            const rc = Number(entry[0]);

            return (
              <li key={entry[0]}>
                RC {duplicateRowCounts ? rc * 2 : rc}:{' '}
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
      Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,{' '}
      {slope?.type} <HighlightedValue>{slope?.stitchDelta}</HighlightedValue>{' '}
      {pluralizeStitch(slope?.stitchDelta)} {manipulationLocation} every{' '}
      <HighlightedValue>{slope?.rowInterval}</HighlightedValue> rows.{' '}
    </>
  );
};
