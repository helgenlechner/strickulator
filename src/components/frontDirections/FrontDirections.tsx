import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getSlopeForBottomArmholeDecreases,
  getNumberOfStitchesBetweenArmholes,
  getSlopeForNeckDecreases,
  getNumberOfStitchesAtNeck,
  getNumberOfRowsBelowNeck,
} from '../../state/back/back.selectors';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfStraightRowsBetweenArmholes,
  getSlopeForBodiceIncreases,
  getNumberOfRowsOfBottomArmhole,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStitchesBelowArmhole,
} from '../../state/sharedMeasurements/sharedMeasurements.selectors';
import { Directions } from '../directions/Directions';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';
import { Step } from '../step/Step';

export const FrontDirections: FunctionComponent = () => {
  const slopeForNeckDecreases = useRecoilValue(getSlopeForNeckDecreases);

  return (
    <Directions>
      <Step>
        Cast on{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step>
        Knit ribbing for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemRows)}
        </HighlightedValue>{' '}
        rows.
      </Step>
      <Step>Transfer all stitches to front bed.</Step>
      <Step>
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
      </Step>
      <Step>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        stitches on either side. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step>
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
      </Step>
      <Step>
        Knit straight for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </Step>
      <Step>
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
      </Step>
      <Step>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches at neck.
      </Step>
    </Directions>
  );
};
