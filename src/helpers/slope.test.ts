import { calculateSlope } from './slope';

describe('calculateSlope', () => {
  it('should calculate shallow slope', () => {
    const wideMeasurement = 20;
    const narrowMeasurement = 10;
    const numberOfRows = 12;

    const expected = {
      numberOfRows: 2,
      numberOfStitches: 2,
    };
    const actual = calculateSlope(
      wideMeasurement,
      narrowMeasurement,
      numberOfRows,
    );

    expect(actual).toEqual(expected);
  });

  it('should calculate steep slope', () => {
    const wideMeasurement = 40;
    const narrowMeasurement = 10;
    const numberOfRows = 12;

    const expected = {
      numberOfRows: 2,
      numberOfStitches: 5,
      excess: 0,
    };
    const actual = calculateSlope(
      wideMeasurement,
      narrowMeasurement,
      numberOfRows,
    );

    expect(actual).toEqual(expected);
  });
});
