import {
  countArrayByCondition,
  getMaxInArrayByFormula,
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
