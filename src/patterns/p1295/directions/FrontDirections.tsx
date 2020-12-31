import React, { FunctionComponent } from 'react';
import { pluralizeStitch } from '../../../helpers/pluralize';
import { Directions } from '../../../components/directions/Directions';
import { HighlightedValue } from '../../../components/highlightedValue/HighlightedValue';
import { Section } from '../../../components/section/Section';
import { SlopeDescription } from '../../../components/slopeDescription/SlopeDescription';
import { Step } from '../../../components/step/Step';
import {
  getDoesNecklineStartInSectionE,
  getDoesNecklineStartInSectionF,
  getFrontArmscyeSlope,
  getFrontNecklineSlope,
  getFrontNumberOfRowsAtShoulder,
  getFrontNumberOfStitchesBetweenArmholes,
  getNumberOfArmholeStitchesToCastOff,
  getNumberOfFrontNecklineRows,
  getNumberOfHemRows,
  getNumberOfHemStitches,
  getNumberOfStitchesAfterLowerBottomArmholeDecreases,
  getNumberOfStitchesAtBottomOfArmhole,
  getNumberOfStitchesBelowArmhole,
  getNumberOfStitchesForFrontShoulderCastOff,
  getNumberOfStraightRowsBetweenArmholes,
  getSlopeForBodiceIncreases,
  getSlopeForLowerBottomArmholeDecreases,
  getSlopeForUpperBottomArmholeDecreases,
} from '../selectors/p1295.directions.selectors';
import { connect } from 'react-redux';
import { getIsKnittedInTheRound } from '../selectors/p1295.knittingStyle.selectors';
import { AppState } from '../../../store/store.model';
import { Slope } from '../../../helpers/slope';
import { PatternProps } from '../../../store/pattern/pattern.model';

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
  slopeForLowerBottomArmholeDecreases: Slope | undefined;
  numberOfStitchesAfterLowerBottomArmholeDecreases: number | undefined;
  slopeForUpperBottomArmholeDecreases: Slope | undefined;
  numberOfStitchesBetweenArmholes: number | undefined;
  doesNecklineStartInSectionE: boolean;
  armscyeSlope: Slope | undefined;
  doesNecklineStartInSectionF: boolean;
  numberOfStitchesForFrontShoulderCastOff: number | undefined;
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
  slopeForLowerBottomArmholeDecreases: getSlopeForLowerBottomArmholeDecreases(
    state,
    ownProps,
  ),
  numberOfStitchesAfterLowerBottomArmholeDecreases: getNumberOfStitchesAfterLowerBottomArmholeDecreases(
    state,
    ownProps,
  ),
  slopeForUpperBottomArmholeDecreases: getSlopeForUpperBottomArmholeDecreases(
    state,
    ownProps,
  ),
  numberOfStitchesBetweenArmholes: getFrontNumberOfStitchesBetweenArmholes(
    state,
    ownProps,
  ),
  doesNecklineStartInSectionE: getDoesNecklineStartInSectionE(state, ownProps),
  armscyeSlope: getFrontArmscyeSlope(state, ownProps),
  doesNecklineStartInSectionF: getDoesNecklineStartInSectionF(state, ownProps),
  numberOfStitchesForFrontShoulderCastOff: getNumberOfStitchesForFrontShoulderCastOff(
    state,
    ownProps,
  ),
});

const FrontDirections_: FunctionComponent<PatternProps & ConnectedState> = ({
  numberOfNecklineRows,
  numberOfRowsAtShoulder,
  numberOfStraightRowsBetweenArmholes,
  necklineSlope,
  numberOfHemStitches,
  numberOfHemRows,
  slopeForBodiceIncreases,
  isKnittedInTheRound,
  numberOfStitchesBelowArmhole,
  numberOfArmholeStitchesToCastOff,
  numberOfStitchesAtBottomOfArmhole,
  slopeForLowerBottomArmholeDecreases,
  numberOfStitchesAfterLowerBottomArmholeDecreases,
  slopeForUpperBottomArmholeDecreases,
  numberOfStitchesBetweenArmholes,
  doesNecklineStartInSectionE,
  armscyeSlope,
  doesNecklineStartInSectionF,
  numberOfStitchesForFrontShoulderCastOff,
}) => {
  const necklineSlopeDescription = (
    <SlopeDescription
      slope={necklineSlope}
      manipulationLocation="at the neckline"
    />
  );

  return (
    <Directions id="front">
      <Section id="A">
        <Step id="1">
          Cast on <HighlightedValue>{numberOfHemStitches}</HighlightedValue>{' '}
          &times; 2 stitches in 2:2 industrial rib.
        </Step>
        <Step id="2">
          Knit ribbing for{' '}
          <HighlightedValue>{numberOfHemRows}</HighlightedValue> rows.
        </Step>
        <Step id="3">Transfer all stitches to front bed.</Step>
      </Section>
      <Section id="B">
        <Step id="1">
          <SlopeDescription
            slope={slopeForBodiceIncreases}
            duplicateRowCounts={isKnittedInTheRound}
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
          <HighlightedValue>
            {numberOfArmholeStitchesToCastOff}
          </HighlightedValue>{' '}
          {pluralizeStitch(numberOfArmholeStitchesToCastOff)} on either side.
        </Step>
        <Step id="2">
          There should be{' '}
          <HighlightedValue>
            {numberOfStitchesAtBottomOfArmhole}
          </HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
        <Step id="3">
          <SlopeDescription slope={slopeForLowerBottomArmholeDecreases} />
        </Step>
        <Step id="4">
          There should be{' '}
          <HighlightedValue>
            {numberOfStitchesAfterLowerBottomArmholeDecreases}
          </HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
      </Section>
      <Section id="D">
        <Step id="1">
          <SlopeDescription slope={slopeForUpperBottomArmholeDecreases} />
        </Step>
        <Step id="2">
          There should be{' '}
          <HighlightedValue>{numberOfStitchesBetweenArmholes}</HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
      </Section>
      <Section id="E">
        <Step id="1">
          Knit straight for{' '}
          <HighlightedValue>
            {numberOfStraightRowsBetweenArmholes}
          </HighlightedValue>{' '}
          rows.
        </Step>
        {doesNecklineStartInSectionE && (
          <>
            <Step id="2">
              Once{' '}
              <HighlightedValue>
                {(numberOfStraightRowsBetweenArmholes ?? 0) +
                  (numberOfRowsAtShoulder ?? 0) -
                  (numberOfNecklineRows ?? 0)}
              </HighlightedValue>{' '}
              rows of this section have been worked, divide the work into two
              halves for the neckline and shape it (make sure to switch to the
              next section's instructions for armscye shaping once the straight
              rows are finished):
            </Step>
            <Step id="3">{necklineSlopeDescription}</Step>
          </>
        )}
      </Section>
      <Section id="F">
        <Step id="1">
          <SlopeDescription
            slope={armscyeSlope}
            manipulationLocation="at the armscye"
          />
        </Step>
        {doesNecklineStartInSectionF && (
          <>
            <Step id="2">
              Once{' '}
              <HighlightedValue>
                {(numberOfRowsAtShoulder ?? 0) - (numberOfNecklineRows ?? 0)}
              </HighlightedValue>{' '}
              rows of this section have been worked, divide the work into two
              halves for the neckline and shape it:
            </Step>
            <Step id="3">{necklineSlopeDescription}</Step>
          </>
        )}
        <Step id="4">
          Cast off{' '}
          <HighlightedValue>
            {numberOfStitchesForFrontShoulderCastOff}
          </HighlightedValue>{' '}
          stitches.
        </Step>
        <Step id="5">Repeat for the other half of the shoulder area.</Step>
      </Section>
    </Directions>
  );
};

export const FrontDirections = connect(mapStateToProps)(FrontDirections_);
