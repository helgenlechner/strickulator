import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../helpers/pluralize';
import { Slope } from '../../helpers/slope';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';
import styles from './SlopeDescription.module.css';

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

  if (!slope || slope.delta === 0) {
    return (
      <>
        Knit straight for <HighlightedValue>{numberOfRows}</HighlightedValue>{' '}
        rows.
      </>
    );
  }

  if (slope && 'pattern' in slope) {
    return (
      <ul className={styles.pattern}>
        {Object.entries(slope.pattern).map((entry) => {
          const formattedCount = `${slope.type === 'increasing' ? '+' : '-'}${
            entry[1]
          }`;
          const rc = Number(entry[0]);

          return (
            <li key={entry[0]}>
              RC&#8239;{duplicateRowCounts ? rc * 2 : rc}:&nbsp;
              <span className={styles.count} data-count={formattedCount}>
                {formattedCount}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      Knit for <HighlightedValue>{numberOfRows}</HighlightedValue> rows,{' '}
      {slope?.type} <HighlightedValue>{slope?.stitchDelta}</HighlightedValue>{' '}
      {pluralizeStitch(slope?.stitchDelta)} {manipulationLocation} every{' '}
      <HighlightedValue>
        {duplicateRowCounts && slope
          ? slope.rowInterval * 2
          : slope?.rowInterval}
      </HighlightedValue>{' '}
      rows.{' '}
    </>
  );
};
