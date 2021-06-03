import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Directions } from '../../../components/directions/Directions';
import { HighlightedValue } from '../../../components/highlightedValue/HighlightedValue';
import { Section } from '../../../components/section/Section';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { Step } from '../../../components/step/Step';
import { Slope } from '../../../helpers/slope';
import { PatternProps } from '../../../store/pattern/pattern.model';
import { AppState } from '../../../store/store.model';
import {
  getBackNumberOfStitchesBetweenArmholes,
  getFrontNecklineSlope,
  getFrontNumberOfRowsAtShoulder,
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfFrontNecklineRows,
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

interface ConnectedState {
  numberOfNecklineRows: number | undefined;
  numberOfRowsAtShoulder: number | undefined;
  numberOfStraightRowsBetweenArmholes: number | undefined;
  necklineSlope: Slope | undefined;
  numberOfHemStitches: number | undefined;
  numberOfHemRows: number | undefined;
  slopeForBodiceIncreases: Slope | undefined;
  isKnittedInTheRound: boolean;
  numberOfStitchesBelowArmhole: number | undefined;
  numberOfArmholeStitchesToCastOff: number | undefined;
  numberOfStitchesAtBottomOfArmhole: number | undefined;
  slopeForBottomArmholeDecreases: Slope | undefined;
  numberOfStitchesBetweenArmholes: number | undefined;
  slopeForBackShoulderDecreases: Slope | undefined;
  numberOfStitchesAtNeck: number | undefined;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PatternProps,
): ConnectedState => ({
  numberOfNecklineRows: getNumberOfFrontNecklineRows(state, ownProps),
  numberOfRowsAtShoulder: getFrontNumberOfRowsAtShoulder(state, ownProps),
  numberOfStraightRowsBetweenArmholes: getNumberOfStraightRowsBetweenArmholes(
    state,
    ownProps,
  ),
  necklineSlope: getFrontNecklineSlope(state, ownProps),
  numberOfHemStitches: getNumberOfHemStitches(state, ownProps),
  numberOfHemRows: getNumberOfHemRows(state, ownProps),
  slopeForBodiceIncreases: getSlopeForBodiceIncreases(state, ownProps),
  isKnittedInTheRound: getIsKnittedInTheRound(state, ownProps),
  numberOfStitchesBelowArmhole: getNumberOfStitchesBelowArmhole(
    state,
    ownProps,
  ),
  numberOfArmholeStitchesToCastOff: getNumberOfArmholeStitchesToCastOff(
    state,
    ownProps,
  ),
  numberOfStitchesAtBottomOfArmhole: getNumberOfStitchesAtBottomOfArmhole(
    state,
    ownProps,
  ),
  slopeForBottomArmholeDecreases: getSlopeForBackBottomArmholeDecreases(
    state,
    ownProps,
  ),
  numberOfStitchesBetweenArmholes: getBackNumberOfStitchesBetweenArmholes(
    state,
    ownProps,
  ),
  slopeForBackShoulderDecreases: getSlopeForBackShoulderDecreases(
    state,
    ownProps,
  ),
  numberOfStitchesAtNeck: getNumberOfStitchesAtNeck(state, ownProps),
});

const BackDirections_: FunctionComponent<PatternProps & ConnectedState> = ({
  numberOfHemStitches,
  numberOfHemRows,
  slopeForBodiceIncreases,
  isKnittedInTheRound,
  numberOfStitchesBelowArmhole,
  numberOfArmholeStitchesToCastOff,
  numberOfStitchesAtBottomOfArmhole,
  slopeForBottomArmholeDecreases,
  numberOfStitchesBetweenArmholes,
  numberOfStraightRowsBetweenArmholes,
  slopeForBackShoulderDecreases,
  numberOfStitchesAtNeck,
}) => (
  <Directions id="back">
    <Section id="A">
      <Step id="1">
        Cast on <HighlightedValue>{numberOfHemStitches}</HighlightedValue>{' '}
        &times; 2 stitches in 2:2 industrial rib.
      </Step>
      <Step id="2">
        Knit ribbing for <HighlightedValue>{numberOfHemRows}</HighlightedValue>{' '}
        rows.
      </Step>
      <Step id="3">Transfer all stitches to front bed.</Step>
    </Section>
    <Section id="B">
      <Step id="1">
        <SlopeDescription
          slope={slopeForBodiceIncreases}
          doubleRowCounts={isKnittedInTheRound}
        />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>{numberOfStitchesBelowArmhole}</HighlightedValue>{' '}
        &times; 2 stitches on the needles.
      </Step>
    </Section>
    <Section id="C">
      <Step id="1">
        Cast off{' '}
        <HighlightedValue>{numberOfArmholeStitchesToCastOff}</HighlightedValue>{' '}
        stitches on either side. There should be{' '}
        <HighlightedValue>{numberOfStitchesAtBottomOfArmhole}</HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
      <Step id="2">
        <SlopeDescription slope={slopeForBottomArmholeDecreases} />
      </Step>
      <Step id="3">
        There should be{' '}
        <HighlightedValue>{numberOfStitchesBetweenArmholes}</HighlightedValue>{' '}
        &times; 2 stitches.
      </Step>
    </Section>
    <Section id="D">
      <Step id="1">
        Knit straight for{' '}
        <HighlightedValue>
          {numberOfStraightRowsBetweenArmholes}
        </HighlightedValue>{' '}
        rows.
      </Step>
    </Section>
    <Section id="E">
      <Step id="1">
        <SlopeDescription slope={slopeForBackShoulderDecreases} />
      </Step>
      <Step id="2">
        There should be{' '}
        <HighlightedValue>{numberOfStitchesAtNeck}</HighlightedValue> &times; 2
        stitches.
      </Step>
      <Step id="3">
        Cast off <HighlightedValue>{numberOfStitchesAtNeck}</HighlightedValue>{' '}
        &times; 2 stitches at neck.
      </Step>
    </Section>
  </Directions>
);

export const BackDirections = connect(mapStateToProps)(BackDirections_);
