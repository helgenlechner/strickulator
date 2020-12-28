import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { pluralizeStitch } from '../../helpers/pluralize';
import {
  getNumberOfStitchesBetweenArmholes,
  getSlopeForUpperBottomArmholeDecreases,
  getSlopeForLowerBottomArmholeDecreases,
  getNumberOfStitchesAfterLowerBottomArmholeDecreases,
  getFrontArmscyeSlope,
  getNumberOfStitchesForFrontShoulderCastOff,
  getFrontNecklineSlope,
  getNumberOfNecklineRows,
  getNumberOfRowsAtShoulder,
} from '../../state/front/front.selectors';
import { getIsKnittedInTheRound } from '../../state/knittingStyle/knittingStyle.selectors';
import {
  getNumberOfArmholeStitchesToCastOff,
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

export const FrontDirections: FunctionComponent = () => {
  const numberOfNecklineRows = useRecoilValue(getNumberOfNecklineRows);
  const numberOfRowsAtShoulder = useRecoilValue(getNumberOfRowsAtShoulder);
  const numberOfStraightRowsBetweenArmholes = useRecoilValue(
    getNumberOfStraightRowsBetweenArmholes,
  );

  const necklineStartsInSectionF =
    (numberOfNecklineRows ?? 0) <= (numberOfRowsAtShoulder ?? 0);
  const necklineStartsInSectionE =
    numberOfNecklineRows !== undefined &&
    numberOfRowsAtShoulder !== undefined &&
    numberOfStraightRowsBetweenArmholes !== undefined &&
    numberOfNecklineRows > numberOfRowsAtShoulder &&
    numberOfNecklineRows <=
      numberOfRowsAtShoulder + numberOfStraightRowsBetweenArmholes;

  const necklineSlopeDescription = (
    <SlopeDescription
      slope={useRecoilValue(getFrontNecklineSlope)}
      manipulationLocation="at the neckline"
    />
  );

  return (
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
            slope={useRecoilValue(getSlopeForBodiceIncreases)}
            duplicateRowCounts={useRecoilValue(getIsKnittedInTheRound)}
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
            slope={useRecoilValue(getSlopeForLowerBottomArmholeDecreases)}
          />
        </Step>
        <Step id="4">
          There should be{' '}
          <HighlightedValue>
            {useRecoilValue(
              getNumberOfStitchesAfterLowerBottomArmholeDecreases,
            )}
          </HighlightedValue>{' '}
          &times; 2 stitches.
        </Step>
      </Section>
      <Section id="D">
        <Step id="1">
          <SlopeDescription
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
            {numberOfStraightRowsBetweenArmholes}
          </HighlightedValue>{' '}
          rows.
        </Step>
        {necklineStartsInSectionE && (
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
            slope={useRecoilValue(getFrontArmscyeSlope)}
            manipulationLocation="at the armscye"
          />
        </Step>
        {necklineStartsInSectionF && (
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
            {useRecoilValue(getNumberOfStitchesForFrontShoulderCastOff)}
          </HighlightedValue>{' '}
          stitches.
        </Step>
        <Step id="5">Repeat for the other half of the shoulder area.</Step>
      </Section>
    </Directions>
  );
};
