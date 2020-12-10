import {
  countTotal1And3ValidPermutations,
  generate1And3ValidPermutationsConsecutiveConverter,
  getJoltageDifferences,
  sortAndAddWallAndDevice,
} from '../joltage';

test('sortAndAddWallAndDevice', () => {
  expect(sortAndAddWallAndDevice([7, 2, 10, 1])).toEqual([0, 1, 2, 7, 10, 13]);
});

test('getJoltageDifferences', () => {
  expect(getJoltageDifferences([7, 2, 10, 1])).toEqual({ 1: 2, 3: 2, 5: 1 });
});

describe('generate1And3ValidPermutationsConsecutiveConverter', () => {
  it('should return the default permutations', () => {
    expect(generate1And3ValidPermutationsConsecutiveConverter()).toEqual({
      1: 1,
      2: 1,
      3: 2,
    });
  });
  it('should return the permutations for larger length', () => {
    expect(generate1And3ValidPermutationsConsecutiveConverter(5)).toEqual({
      1: 1,
      2: 1,
      3: 2,
      4: 4,
      5: 7,
    });
  });
  it('should return the permutations for larger length from a starter', () => {
    expect(
      generate1And3ValidPermutationsConsecutiveConverter(5, {
        1: 3,
        2: 4,
        3: 9,
      }),
    ).toEqual({
      1: 3,
      2: 4,
      3: 9,
      4: 16,
      5: 29,
    });
  });
});

test('countTotal1And3ValidPermutations', () => {
  const joltageAdapters = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
  expect(countTotal1And3ValidPermutations(joltageAdapters)).toBe(8);
});
