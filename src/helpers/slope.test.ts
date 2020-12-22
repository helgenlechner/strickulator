import { calculateSlope } from './slope';

describe('calculateSlope', () => {
  it('should calculate shallow slope', () => {
    const wideMeasurement = 10;
    const narrowMeasurement = 5;
    const numberOfRows = 12;

    const expected = {
      type: 'decreasing',
      delta: 5,
      pattern: {
        2: 1,
        4: 1,
        6: 1,
        9: 1,
        11: 1,
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
      type: 'increasing',
      pattern: {
        1: 3,
        2: 2,
        3: 3,
        4: 2,
        5: 3,
        6: 2,
        7: 3,
        8: 2,
        9: 3,
        10: 2,
        11: 3,
        12: 2,
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
