import {
  countArrayByCondition,
  getMaxInArrayByFormula,
  isArrayInArray,
  multArrayByFormula,
  sumArrayByFormula,
} from '../array';

describe('sumArrayByFormula', () => {
  it('should sum with identity formula', () => {
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

describe('multArrayByFormula', () => {
  it('should sum with identity formula', () => {
    expect(multArrayByFormula([10, 2, 3], (element) => element)).toBe(60);
  });
  it('should sum on object', () => {
    expect(
      multArrayByFormula(
        [
          { length: 3, width: 6 },
          { length: 2, width: 10 },
        ],
        (element) => element.length * element.width,
      ),
    ).toBe(360);
  });
});

describe('countArrayByCondition', () => {
  it('should count with basic condition', () => {
    expect(countArrayByCondition([1, 2, 3], (element) => element >= 2)).toBe(2);
  });
  it('should count with condition on object', () => {
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

describe('getMaxInArrayByFormula', () => {
  it('should get max with identity formula', () => {
    expect(getMaxInArrayByFormula([1, 7, 3], (element) => element)).toBe(7);
  });
  it('should get max with identity formula on negative numbers', () => {
    expect(getMaxInArrayByFormula([-1, -7, -3], (element) => element)).toBe(-1);
  });
  it('should get max with formula on object', () => {
    expect(
      getMaxInArrayByFormula(
        [
          { length: 3, width: 6 },
          { length: 2, width: 10 },
        ],
        (element) => element.width * element.length,
      ),
    ).toBe(20);
  });
});
describe('isArrayInArray', () => {
  const big = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  it('should return true if it is in array', () => {
    expect(isArrayInArray([3, 4], big)).toBe(true);
  });
  it('should return false if it is not in array', () => {
    expect(isArrayInArray([2, 1], big)).toBe(false);
  });
});
