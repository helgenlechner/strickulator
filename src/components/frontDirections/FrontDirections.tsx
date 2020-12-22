import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { pluralizeStitch } from '../../helpers/pluralize';
import {
  getNumberOfStitchesBetweenArmholes,
  getSlopeForUpperBottomArmholeDecreases,
  getSlopeForLowerBottomArmholeDecreases,
  getNumberOfUpperBottomArmholeRows,
  getNumberOfLowerBottomArmholeRows,
  getNumberOfStitchesAfterLowerBottomArmholeDecreases,
  getNumberOfRowsAtShoulder,
  getFrontArmscyeSlope,
  getNumberOfStitchesForFrontShoulderCastOff,
  getNumberOfNecklineRows,
  getFrontNecklineSlope,
} from '../../state/front/front.selectors';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfBodiceRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfStraightRowsBetweenArmholes,
  getSlopeForBodiceIncreases,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStitchesBelowArmhole,
} from '../../state/sharedMeasurements/sharedMeasurements.selectors';
import { Directions } from '../directions/Directions';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';
import { Section } from '../section/Section';
import { SlopeDescription } from '../slopeDescription/SlopeDescription';
import { Step } from '../step/Step';

export const FrontDirections: FunctionComponent = () => (
  <Directions>
    <Section>
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
    </Section>
    <Section>
      <Step>
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfBodiceRows)}
          slope={useRecoilValue(getSlopeForBodiceIncreases)}
        />
      </Step>
      <Step>
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBelowArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </Step>
    </Section>
    <Section>
      <Step>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        {pluralizeStitch(useRecoilValue(getNumberOfArmholeStitchesToCastOff))}{' '}
        on either side.
      </Step>
      <Step>
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step>
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfLowerBottomArmholeRows)}
          slope={useRecoilValue(getSlopeForLowerBottomArmholeDecreases)}
        />
      </Step>
      <Step>
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAfterLowerBottomArmholeDecreases)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section>
      <Step>
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfUpperBottomArmholeRows)}
          slope={useRecoilValue(getSlopeForUpperBottomArmholeDecreases)}
        />
      </Step>
      <Step>
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section>
      <Step>
        Knit straight for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </Step>
    </Section>
    <Section>
      <Step>
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfNecklineRows)}
          slope={useRecoilValue(getFrontNecklineSlope)}
          manipulationLocation="at the neckline"
        />
      </Step>
      <Step>
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfRowsAtShoulder)}
          slope={useRecoilValue(getFrontArmscyeSlope)}
          manipulationLocation="at the armscye"
        />
      </Step>
      <Step>
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesForFrontShoulderCastOff)}
        </HighlightedValue>{' '}
        stitches.
      </Step>
    </Section>
  </Directions>
);
