import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { getNumberOfArmholeStitchesToCastOff } from '../../state/sharedMeasurements/sharedMeasurements.selectors';
import {
  getNumberOfRowsForSleeveHem,
  getNumberOfSleeveHeadStitches,
  getNumberOfStitchesAfterArmholeCastOff,
  getNumberOfStitchesAtUnderarm,
  getNumberOfStitchesAtWrist,
  getSleeveArmScyeSlope,
  getSlopeForSleeveIncreases,
} from '../../state/sleeve/sleeve.selectors';
import { Directions } from '../directions/Directions';
import { HighlightedValue } from '../highlightedValue/HighlightedValue';
import { Section } from '../section/Section';
import { SlopeDescription } from '../slopeDescription/SlopeDescription';
import { Step } from '../step/Step';

export const SleeveDirections: FunctionComponent = () => (
  <Directions id="sleeve">
    <Section id="A">
      <Step id="1">
        Cast on{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtWrist)}
        </HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfRowsForSleeveHem)}
        </HighlightedValue>{' '}
        rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription slope={useRecoilValue(getSlopeForSleeveIncreases)} />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfStitchesAtUnderarm)}
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
          {useRecoilValue(getNumberOfStitchesAfterArmholeCastOff)}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription slope={useRecoilValue(getSleeveArmScyeSlope)} />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>
          {useRecoilValue(getNumberOfSleeveHeadStitches)}
        </HighlightedValue>{' '}
        &times; 2 stitches to cast off.
      </Step>
    </Section>
  </Directions>
);
