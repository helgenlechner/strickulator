import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Directions } from '../../../components/directions/Directions';
import { HighlightedValue } from '../../../components/highlightedValue/HighlightedValue';
import { Section } from '../../../components/section/Section';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { Step } from '../../../components/step/Step';
import {
  getBackNumberOfStitchesBetweenArmholes,
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStitchesAtNeck,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStraightRowsBetweenArmholes,
  getSlopeForBackBottomArmholeDecreases,
  getSlopeForBackShoulderDecreases,
  getSlopeForBodiceIncreases,
} from '../selectors/p1295.directions.selectors';
import { getIsKnittedInTheRound } from '../selectors/p1295.knittingStyle.selectors';

export const BackDirections: FunctionComponent = () => (
  <Directions id="back">
    <Section id="A">
      <Step id="1">
        Cast on{' '}
        <HighlightedValue>
          {useSelector(getNumberOfHemStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for{' '}
        <HighlightedValue>{useSelector(getNumberOfHemRows)}</HighlightedValue>{' '}
        rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription
          slope={useSelector(getSlopeForBodiceIncreases)}
          duplicateRowCounts={useSelector(getIsKnittedInTheRound)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesBelowArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </Step>
    </Section>
    <Section id="C">
      <Step id="1">
        Cast off{' '}
        <HighlightedValue>
          {useSelector(getNumberOfArmholeStitchesToCastOff)}
        </HighlightedValue>{' '}
        stitches on either side. There should be{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesAtBottomOfArmhole)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription
          slope={useSelector(getSlopeForBackBottomArmholeDecreases)}
        />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>
          {useSelector(getBackNumberOfStitchesBetweenArmholes)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section id="D">
      <Step id="1">
        Knit straight for{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStraightRowsBetweenArmholes)}
        </HighlightedValue>{' '}
        rows.
      </Step>
    </Section>
    <Section id="E">
      <Step id="1">
        <SlopeDescription
          slope={useSelector(getSlopeForBackShoulderDecreases)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="3">
        Cast off{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesAtNeck)}
        </HighlightedValue>{' '}
        &times; 2 stitches at neck.
      </Step>
    </Section>
  </Directions>
);
