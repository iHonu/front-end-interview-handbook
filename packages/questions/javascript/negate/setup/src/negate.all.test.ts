import negateGFE from './negate';
import { negate as negateLodash } from 'lodash';
import negateAlt from './negate-alt';

describe('negate', () => {
  [negateLodash, negateGFE, negateAlt].forEach((negate) => {
    test('negate a function returning true', () => {
      const alwaysTrue = () => true;
      const negated = negate(alwaysTrue);
      expect(negated()).toEqual(false);
    });

    test('negate a function returning false', () => {
      const alwaysFalse = () => false;
      const negated = negate(alwaysFalse);
      expect(negated()).toEqual(true);
    });

    test('negate a function with a single numeric argument', () => {
      const isEven = (n: number) => n % 2 === 0;
      const isOdd = negate(isEven);
      expect(isOdd(3)).toEqual(true);
      expect(isOdd(4)).toEqual(false);
    });

    test('negate a function with multiple arguments', () => {
      const sumGreaterThan = (a: number, b: number, threshold: number) =>
        a + b > threshold;
      const sumNotGreaterThan = negate(sumGreaterThan);
      expect(sumNotGreaterThan(1, 1, 3)).toEqual(true);
      expect(sumNotGreaterThan(2, 2, 3)).toEqual(false);
    });

    test('negate a function with side effects', () => {
      let counter = 0;
      const incrementCounter = () => {
        counter++;
        return counter % 2 === 0;
      };
      const negated = negate(incrementCounter);
      expect(negated()).toEqual(true);
      expect(negated()).toEqual(false);
    });
  });
});
