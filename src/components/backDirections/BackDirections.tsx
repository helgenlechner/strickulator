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
  getNumberOfStitchesBeforeArmhole,
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
    <>
      <p>
        Cast on{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemStitches)}
        </HighlightedValue>{' '}
        stitches in 2:2 industrial rib.
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
        stitches total every{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBodiceIncreases)?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBeforeArmhole)}
        </HighlightedValue>{' '}
        stitches on the needles.
      </p>
      <p>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        stitches at either end. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        stitches.
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
        stitches total every{' '}
        <HighlightedValue>
          {useRecoilValue(getSlopeForBottomArmholeDecreases)?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        stitches.
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
        stitches total every{' '}
        <HighlightedValue>
          {slopeForNeckDecreases?.numberOfRows}
        </HighlightedValue>{' '}
        rows. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        stitches.
        {slopeForNeckDecreases?.excess &&
          ` Excess: ${slopeForNeckDecreases?.excess}`}
      </p>
      <p>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        stitches at neck.
      </p>
    </>
  );
};
