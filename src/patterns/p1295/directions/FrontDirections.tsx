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
import { useSelector } from 'react-redux';
import { getIsKnittedInTheRound } from '../selectors/p1295.knittingStyle.selectors';

export const FrontDirections: FunctionComponent = () => {
  const numberOfNecklineRows = useSelector(getNumberOfFrontNecklineRows);
  const numberOfRowsAtShoulder = useSelector(getFrontNumberOfRowsAtShoulder);
  const numberOfStraightRowsBetweenArmholes = useSelector(
    getNumberOfStraightRowsBetweenArmholes,
  );

  const necklineSlopeDescription = (
    <SlopeDescription
      slope={useSelector(getFrontNecklineSlope)}
      manipulationLocation="at the neckline"
    />
  );

  return (
    <Directions id="front">
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
          {pluralizeStitch(useSelector(getNumberOfArmholeStitchesToCastOff))} on
          either side.
        </Step>
        <Step id="2">
          There should be{' '}
          <HighlightedValue>
            {useSelector(getNumberOfStitchesAtBottomOfArmhole)}
          </HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
        <Step id="3">
          <SlopeDescription
            slope={useSelector(getSlopeForLowerBottomArmholeDecreases)}
          />
        </Step>
        <Step id="4">
          There should be{' '}
          <HighlightedValue>
            {useSelector(getNumberOfStitchesAfterLowerBottomArmholeDecreases)}
          </HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
      </Section>
      <Section id="D">
        <Step id="1">
          <SlopeDescription
            slope={useSelector(getSlopeForUpperBottomArmholeDecreases)}
          />
        </Step>
        <Step id="2">
          There should be{' '}
          <HighlightedValue>
            {useSelector(getFrontNumberOfStitchesBetweenArmholes)}
          </HighlightedValue>{' '}
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
        {useSelector(getDoesNecklineStartInSectionE) && (
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
            slope={useSelector(getFrontArmscyeSlope)}
            manipulationLocation="at the armscye"
          />
        </Step>
        {useSelector(getDoesNecklineStartInSectionF) && (
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
            {useSelector(getNumberOfStitchesForFrontShoulderCastOff)}
          </HighlightedValue>{' '}
          stitches.
        </Step>
        <Step id="5">Repeat for the other half of the shoulder area.</Step>
      </Section>
    </Directions>
  );
};
