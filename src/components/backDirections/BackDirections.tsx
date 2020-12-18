import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getSlopeForBodiceIncreases,
  getSlopeForBottomArmholeDecreases,
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStitchesBetweenArmholes,
  getNumberOfStraightRowsBetweenArmholes,
  getSlopeForNeckDecreases,
  getNumberOfStitchesAtNeck,
  getNumberOfRowsBelowNeck,
} from '../../state/back/back.selectors';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';

export const BackDirections: React.FunctionComponent = () => {
  const slopeForNeckDecreases = useRecoilValue(getSlopeForNeckDecreases);

  return (
    <section>
      <p>
        Cast on{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </p>
      <p>
        Knit ribbing for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemRows)}
        </HighlightedValue>{' '}
        rows.
      </p>
      <p>Transfer all stitches to front bed.</p>
      <p>
        Knit for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfBodiceRows)}
        </HighlightedValue>{' '}
        rows, increasing{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBodiceIncreases)?.numberOfStitches}
        </HighlightedValue>{' '}
        stitches on either end every{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBodiceIncreases)?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBelowArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </p>
      <p>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        stitches on either side. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </p>
      <p>
        Knit for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfRowsOfBottomArmhole)}
        </HighlightedValue>{' '}
        rows, decreasing{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBottomArmholeDecreases)?.numberOfStitches}
        </HighlightedValue>{' '}
        stitches on either end every{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBottomArmholeDecreases)?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </p>
      <p>
        Knit straight for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </p>
      <p>
        Knit for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfRowsBelowNeck)}
        </HighlightedValue>{' '}
        rows, decreasing{' '}
        <HighlightedValue>
          {slopeForNeckDecreases?.numberOfStitches}
        </HighlightedValue>{' '}
        stitches on either end every{' '}
        <HighlightedValue>
          {slopeForNeckDecreases?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
        {slopeForNeckDecreases?.excess &&
          ` Excess: ${slopeForNeckDecreases?.excess}`}
      </p>
      <p>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches at neck.
      </p>
    </section>
  );
};
