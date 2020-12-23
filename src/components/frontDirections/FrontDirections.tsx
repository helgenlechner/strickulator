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
  <Directions id="front">
    <Section id="A">
      <Step id="1">
        Cast on{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfHemRows)}
        </HighlightedValue>{' '}
        rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfBodiceRows)}
          slope={useRecoilValue(getSlopeForBodiceIncreases)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBelowArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </Step>
    </Section>
    <Section id="C">
      <Step id="1">
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        {pluralizeStitch(useRecoilValue(getNumberOfArmholeStitchesToCastOff))}{' '}
        on either side.
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="3">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfLowerBottomArmholeRows)}
          slope={useRecoilValue(getSlopeForLowerBottomArmholeDecreases)}
        />
      </Step>
      <Step id="4">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAfterLowerBottomArmholeDecreases)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section id="D">
      <Step id="1">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfUpperBottomArmholeRows)}
          slope={useRecoilValue(getSlopeForUpperBottomArmholeDecreases)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section id="E">
      <Step id="1">
        Knit straight for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </Step>
    </Section>
    <Section id="F">
      <Step id="1">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfRowsAtShoulder)}
          slope={useRecoilValue(getFrontArmscyeSlope)}
          manipulationLocation="at the armscye"
        />
      </Step>
      <Step id="2">
        AT THE SAME TIME, divide the work into two halves for the neckline and
        shape it:
      </Step>
      <Step id="3">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfNecklineRows)}
          slope={useRecoilValue(getFrontNecklineSlope)}
          manipulationLocation="at the neckline"
        />
      </Step>
      <Step id="4">
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesForFrontShoulderCastOff)}
        </HighlightedValue>{' '}
        stitches.
      </Step>
      <Step id="5">Repeat for the other half of the shoulder area.</Step>
    </Section>
  </Directions>
);
