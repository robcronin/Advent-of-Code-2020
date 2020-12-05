import { getSeatNum } from '../plane';

describe('getSeatNum', () => {
  it('should return for BFFFBBFRRR', () => {
    expect(getSeatNum('BFFFBBFRRR')).toBe(567);
  });
  it('should return for BFFFBBFRRR', () => {
    expect(getSeatNum('BBFFBBFRLL')).toBe(820);
  });
});
