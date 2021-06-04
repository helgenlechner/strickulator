import { calculateSlope } from './slope';

describe('calculateSlope', () => {
  it('should calculate shallow slope', () => {
    const wideMeasurement = 10;
    const narrowMeasurement = 5;
    const numberOfRows = 12;

    const expected = {
      type: 'decreasing',
      numberOfRows,
      delta: 5,
      pattern: {
        2: 1,
        4: 1,
        6: 1,
        10: 1,
        12: 1,
      },
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
      delta: 30,
      numberOfRows,
      type: 'increasing',
      pattern: {
        2: 5,
        4: 5,
        6: 5,
        8: 5,
        10: 5,
        12: 5,
      },
    };
    const actual = calculateSlope(
      narrowMeasurement,
      wideMeasurement,
      numberOfRows,
    );

    expect(actual).toEqual(expected);
  });
});
