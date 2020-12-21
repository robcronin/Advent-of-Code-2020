import { SatelliteRule } from '../input';
import { getValidPatternsForRule } from '../satellite';

const rules: Record<number, SatelliteRule> = {
  0: {
    pattern: undefined,
    subRules: [[4, 1, 5]],
  },
  1: {
    pattern: undefined,
    subRules: [
      [4, 5],
      [5, 4],
    ],
  },
  2: {
    pattern: undefined,
    subRules: [[4, 5, 4, 5, 4]],
  },
  3: {
    pattern: undefined,
    subRules: [[4, 5]],
  },
  4: {
    pattern: 'a',
    subRules: undefined,
  },
  5: {
    pattern: 'b',
    subRules: undefined,
  },
};

const rules2: Record<number, SatelliteRule> = {
  '0': { subRules: [[4, 1, 5]] },
  '1': {
    subRules: [
      [2, 3],
      [3, 2],
    ],
  },
  '2': {
    subRules: [
      [4, 4],
      [5, 5],
    ],
  },
  '3': {
    subRules: [
      [4, 5],
      [5, 4],
    ],
  },
  '4': { pattern: 'a' },
  '5': { pattern: 'b' },
};

describe('getValidPatternsForRule', () => {
  it('should work at last level', () => {
    expect(getValidPatternsForRule(5, rules)).toEqual(['b']);
  });
  it('should work for two simple rules', () => {
    expect(getValidPatternsForRule(3, rules)).toEqual(['ab']);
  });
  it('should work for five simple rules', () => {
    expect(getValidPatternsForRule(2, rules)).toEqual(['ababa']);
  });
  it('should work for a pair of two simple rules', () => {
    expect(getValidPatternsForRule(1, rules)).toEqual(['ab', 'ba']);
  });
  it('should work on the sample input', () => {
    expect(getValidPatternsForRule(0, rules2)).toEqual([
      'aaaabb',
      'aaabab',
      'abbabb',
      'abbbab',
      'aabaab',
      'aabbbb',
      'abaaab',
      'ababbb',
    ]);
  });
});
