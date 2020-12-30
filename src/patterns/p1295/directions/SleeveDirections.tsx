import React, { FunctionComponent } from 'react';
import { Directions } from '../../../components/directions/Directions';
import { HighlightedValue } from '../../../components/highlightedValue/HighlightedValue';
import { Section } from '../../../components/section/Section';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { Step } from '../../../components/step/Step';
import { useSelector } from 'react-redux';
import {
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfRowsForSleeveHem,
  getNumberOfSleeveHeadStitches,
  getNumberOfStitchesAfterArmholeCastOff,
  getNumberOfStitchesAtUnderarm,
  getNumberOfStitchesAtWrist,
  getSleeveArmScyeSlope,
  getSlopeForSleeveIncreases,
} from '../selectors/p1295.directions.selectors';
import { getIsKnittedInTheRound } from '../selectors/p1295.knittingStyle.selectors';

export const SleeveDirections: FunctionComponent = () => (
  <Directions id="sleeve">
    <Section id="A">
      <Step id="1">
        Cast on{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesAtWrist)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for{' '}
        <HighlightedValue>
          {useSelector(getNumberOfRowsForSleeveHem)}
        </HighlightedValue>{' '}
        rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription
          slope={useSelector(getSlopeForSleeveIncreases)}
          duplicateRowCounts={useSelector(getIsKnittedInTheRound)}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useSelector(getNumberOfStitchesAtUnderarm)}
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
          {useSelector(getNumberOfStitchesAfterArmholeCastOff)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription
          slope={useSelector(getSleeveArmScyeSlope)}
          duplicateRowCounts={useSelector(getIsKnittedInTheRound)}
        />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>
          {useSelector(getNumberOfSleeveHeadStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches to cast off.
      </Step>
    </Section>
  </Directions>
);
