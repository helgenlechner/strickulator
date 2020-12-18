import { calculateSlope } from './slope';

describe('calculateSlope', () => {
  it('should calculate shallow slope', () => {
    const wideMeasurement = 10;
    const narrowMeasurement = 5;
    const numberOfRows = 12;

    const expected = {
      numberOfRows: 2,
      numberOfStitches: 1,
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
    };
    const actual = calculateSlope(
      wideMeasurement,
      narrowMeasurement,
      numberOfRows,
    );

    expect(actual).toEqual(expected);
  });
});
