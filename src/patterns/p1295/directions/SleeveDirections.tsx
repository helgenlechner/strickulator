import React, { FunctionComponent } from 'react';
import { Directions } from '../../../components/directions/Directions';
import { HighlightedValue } from '../../../components/highlightedValue/HighlightedValue';
import { Section } from '../../../components/section/Section';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { Step } from '../../../components/step/Step';
import { connect } from 'react-redux';
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
import { Slope } from '../../../helpers/slope';
import { AppState } from '../../../store/store.model';
import { PatternProps } from '../../../store/pattern/pattern.model';

interface ConnectedState {
  numberOfStitchesAtWrist: number | undefined;
  numberOfRowsForSleeveHem: number | undefined;
  slopeForSleeveIncreases: Slope | undefined;
  numberOfStitchesAtUnderarm: number | undefined;
  numberOfArmholeStitchesToCastOff: number | undefined;
  numberOfStitchesAfterArmholeCastOff: number | undefined;
  sleeveArmScyeSlope: Slope | undefined;
  isKnittedInTheRound: boolean;
  numberOfSleeveHeadStitches: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  numberOfStitchesAtWrist: getNumberOfStitchesAtWrist(state, ownProps),
  numberOfRowsForSleeveHem: getNumberOfRowsForSleeveHem(state, ownProps),
  slopeForSleeveIncreases: getSlopeForSleeveIncreases(state, ownProps),
  numberOfStitchesAtUnderarm: getNumberOfStitchesAtUnderarm(state, ownProps),
  numberOfArmholeStitchesToCastOff: getNumberOfArmholeStitchesToCastOff(
    state,
    ownProps,
  ),
  numberOfStitchesAfterArmholeCastOff: getNumberOfStitchesAfterArmholeCastOff(
    state,
    ownProps,
  ),
  sleeveArmScyeSlope: getSleeveArmScyeSlope(state, ownProps),
  isKnittedInTheRound: getIsKnittedInTheRound(state, ownProps),
  numberOfSleeveHeadStitches: getNumberOfSleeveHeadStitches(state, ownProps),
});

const SleeveDirections_: FunctionComponent<PatternProps & ConnectedState> = ({
  numberOfStitchesAtWrist,
  numberOfRowsForSleeveHem,
  slopeForSleeveIncreases,
  numberOfStitchesAtUnderarm,
  numberOfArmholeStitchesToCastOff,
  numberOfStitchesAfterArmholeCastOff,
  sleeveArmScyeSlope,
  isKnittedInTheRound,
  numberOfSleeveHeadStitches,
}) => (
  <Directions id="sleeve">
    <Section id="A">
      <Step id="1">
        Cast on <HighlightedValue>{numberOfStitchesAtWrist}</HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for{' '}
        <HighlightedValue>{numberOfRowsForSleeveHem}</HighlightedValue> rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription
          slope={slopeForSleeveIncreases}
          doubleRowCounts={isKnittedInTheRound}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>{numberOfStitchesAtUnderarm}</HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </Step>
    </Section>
    <Section id="C">
      <Step id="1">
        Cast off{' '}
        <HighlightedValue>{numberOfArmholeStitchesToCastOff}</HighlightedValue>{' '}
        stitches on either side. There should be{' '}
        <HighlightedValue>
          {numberOfStitchesAfterArmholeCastOff}
        </HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription
          slope={sleeveArmScyeSlope}
          doubleRowCounts={isKnittedInTheRound}
        />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>{numberOfSleeveHeadStitches}</HighlightedValue>{' '}
        &times; 2 stitches to cast off.
      </Step>
    </Section>
  </Directions>
);

export const SleeveDirections = connect(mapStateToProps)(SleeveDirections_);
