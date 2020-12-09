import {
  doesSumExist,
  findContiguousValuesForSum,
  findEncryptionWeakness,
  findFirstBrokenSumInput,
} from '../xmas';

const smallInput = [1, 2, 3, 4, 5];
const midInput = [...smallInput, 9, 14, 23, 32, 55, 133, 1000];

describe('doesSumExist', () => {
  it('should return true if sum exists', () => {
    expect(doesSumExist(smallInput, 9)).toBe(true);
  });
  it('should return false if sum does not exist', () => {
    expect(doesSumExist(smallInput, 10)).toBe(false);
  });
});

describe('findFirstBrokenSumInput', () => {
  it('should return first broken sum for preamble of 3', () => {
    expect(findFirstBrokenSumInput(midInput, 3)).toBe(133);
  });
  it('should return undefined if no broken sum', () => {
    expect(findFirstBrokenSumInput(smallInput, 3)).toBe(undefined);
  });
});

describe('findContiguousValuesForSum', () => {
  it('should return single value if in array', () => {
    expect(findContiguousValuesForSum(smallInput, 2)).toEqual([2]);
  });
  it('should return array of values for sum', () => {
    expect(findContiguousValuesForSum(smallInput, 9)).toEqual([2, 3, 4]);
  });
  it('should return undefined if sum not found', () => {
    expect(findContiguousValuesForSum(smallInput, 100)).toBe(undefined);
  });
});

describe('findEncryptionWeakness', () => {
  it('should return encryption weakness', () => {
    expect(findEncryptionWeakness(midInput, 3)).toEqual(64);
  });
  it('should return no broken sum found error if needed', () => {
    expect(() => findEncryptionWeakness(smallInput, 3)).toThrow(
      'Broken sum input not found',
    );
  });
});
