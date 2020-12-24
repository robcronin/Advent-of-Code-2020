import {
  findProductNextTwoCups,
  generateExtraCups,
  getCupsAfter1,
  playCupRound,
  playNumCupRounds,
} from '../cups';

describe('playCupRound', () => {
  it('should play normal round', () => {
    expect(playCupRound([3, 8, 9, 1, 2, 5, 4, 6, 7])).toEqual([
      2,
      8,
      9,
      1,
      5,
      4,
      6,
      7,
      3,
    ]);
  });
  it('should play a round having to loop back on destination cup', () => {
    expect(playCupRound([1, 3, 6, 7, 9, 2, 5, 8, 4])).toEqual([
      9,
      3,
      6,
      7,
      2,
      5,
      8,
      4,
      1,
    ]);
  });
});

describe('playNumCupRounds', () => {
  it('should play 10 normal rounds', () => {
    expect(playNumCupRounds([3, 8, 9, 1, 2, 5, 4, 6, 7], 10)).toEqual([
      8,
      3,
      7,
      4,
      1,
      9,
      2,
      6,
      5,
    ]);
  });
});

describe('getCupsAfter1', () => {
  it('get the cups after 1', () => {
    expect(getCupsAfter1([3, 8, 9, 1, 2, 5, 4, 6, 7])).toEqual(25467389);
  });
});

describe('generateExtraCups', () => {
  it('generate an extra 5 cups', () => {
    expect(generateExtraCups([3, 8, 9, 1, 2, 5, 4, 6, 7], 15)).toEqual([
      3,
      8,
      9,
      1,
      2,
      5,
      4,
      6,
      7,
      10,
      11,
      12,
      13,
      14,
      15,
    ]);
  });
});

describe('findProductNextTwoCups', () => {
  it('find product after 1', () => {
    expect(findProductNextTwoCups([3, 8, 9, 1, 2, 5, 4, 6, 7], 1)).toEqual(10);
  });
  it('find product after 6', () => {
    expect(findProductNextTwoCups([3, 8, 9, 1, 2, 5, 4, 6, 7], 6)).toEqual(21);
  });
  it('find product after 7', () => {
    expect(findProductNextTwoCups([3, 8, 9, 1, 2, 5, 4, 6, 7], 7)).toEqual(24);
  });
});
