import {
  countArrayByCondition,
  countOccurences,
  sumArrayByFormula,
} from '../count';

describe('countOccurences', () => {
  it('should return 5 matches', () => {
    expect(countOccurences('dabbcddded', 'd')).toBe(5);
  });
  it('should return 0 matches', () => {
    expect(countOccurences('dabbcddded', 's')).toBe(0);
  });
});

describe('sumArrayByFormula', () => {
  it('should sum with basic addition', () => {
    expect(sumArrayByFormula([1, 2, 3], (element) => element)).toBe(6);
  });
  it('should sum on object', () => {
    expect(
      sumArrayByFormula(
        [
          { length: 3, width: 6 },
          { length: 2, width: 10 },
        ],
        (element) => element.length * element.width,
      ),
    ).toBe(38);
  });
});

describe('countArrayByCondition', () => {
  it('should sum with basic addition', () => {
    expect(countArrayByCondition([1, 2, 3], (element) => element >= 2)).toBe(2);
  });
  it('should sum on object', () => {
    expect(
      countArrayByCondition(
        [
          { length: 3, width: 6 },
          { length: 2, width: 10 },
        ],
        (element) => element.width / element.length === 2,
      ),
    ).toBe(1);
  });
});
