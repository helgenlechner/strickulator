import { roundToEvenNumber } from './rounding';

describe('Rounding Helpers', () => {
  describe('roundToEvenNumber', () => {
    it('should return the input if it is an even number', () => {
      const input = 4;

      const expected = 4;
      const actual = roundToEvenNumber(input);

      expect(actual).toEqual(expected);
    });

    it.each([60.00001, 60.99999])('should round down', (input) => {
      const expected = 60;
      const actual = roundToEvenNumber(input);

      expect(actual).toEqual(expected);
    });

    it.each([61, 61.99999])('should round up', (input) => {
      const expected = 62;
      const actual = roundToEvenNumber(input);

      expect(actual).toEqual(expected);
    });
  });
});
