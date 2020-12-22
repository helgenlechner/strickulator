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
import { Section } from '../section/Section';
import { SlopeDescription } from '../slopeDescription/SlopeDescription';
import { Step } from '../step/Step';

export const BackDirections: FunctionComponent = () => (
  <Directions id="back">
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
        stitches on either side. There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfRowsOfBottomArmhole)}
          slope={useRecoilValue(getSlopeForBottomArmholeDecreases)}
        />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section id="D">
      <Step id="1">
        Knit straight for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </Step>
    </Section>
    <Section id="E">
      <Step id="1">
        <SlopeDescription
          numberOfRows={useRecoilValue(getNumberOfRowsBelowNeck)}
          slope={useRecoilValue(getSlopeForNeckDecreases)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="3">
        Cast off{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches at neck.
      </Step>
    </Section>
  </Directions>
);
