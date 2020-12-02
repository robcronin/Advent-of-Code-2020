import { countOccurences } from '../count';

describe('countOccurences', () => {
  it('should return 5 matches', () => {
    expect(countOccurences('dabbcddded', 'd')).toBe(5);
  });
  it('should return 0 matches', () => {
    expect(countOccurences('dabbcddded', 's')).toBe(0);
  });
});
