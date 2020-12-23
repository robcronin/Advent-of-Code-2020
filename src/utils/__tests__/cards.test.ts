import {
  calculateWinningScore,
  playNormalRound,
  playNormalToFinish,
  playRecursiveRound,
  playRecursiveToFinish,
} from '../cards';

const player1 = [9, 2, 6, 3, 1];
const player2 = [5, 8, 4, 7, 10];

describe('playNormalRound', () => {
  it('should play one normal round', () => {
    expect(playNormalRound(player1, player2)).toEqual([
      [2, 6, 3, 1, 9, 5],
      [8, 4, 7, 10],
    ]);
  });
  it("should throw an error if one player doesn't have any cards", () => {
    expect(() => playNormalRound(player1, [])).toThrowError(
      'One player has no cards',
    );
  });
});

describe('playNormalToFinish', () => {
  it('should play rounds until one player has all the cards', () => {
    expect(playNormalToFinish(player1, player2)).toEqual([
      3,
      2,
      10,
      6,
      8,
      5,
      9,
      4,
      7,
      1,
    ]);
  });
  it('should play rounds until one player has all the cards with player 1 winning', () => {
    expect(playNormalToFinish(player2, player1)).toEqual([
      3,
      2,
      10,
      6,
      8,
      5,
      9,
      4,
      7,
      1,
    ]);
  });
});

describe('playRecursiveRound', () => {
  it('should play one recursive round with no recursion', () => {
    expect(playRecursiveRound(player1, player2)).toEqual([
      [2, 6, 3, 1, 9, 5],
      [8, 4, 7, 10],
    ]);
  });
  it('should play one recursive round with no recursion with player 1 winning', () => {
    expect(playRecursiveRound(player2, player1)).toEqual([
      [8, 4, 7, 10],
      [2, 6, 3, 1, 9, 5],
    ]);
  });
  it('should play one recursive round with recursion', () => {
    expect(playRecursiveRound([4, 9, 8, 5, 2], [3, 10, 1, 7, 6])).toEqual([
      [9, 8, 5, 2],
      [10, 1, 7, 6, 3, 4],
    ]);
  });
  it("should throw an error if one player doesn't have any cards", () => {
    expect(() => playRecursiveRound(player1, [])).toThrowError(
      'One player has no cards',
    );
  });
});

describe('playRecursiveToFinish', () => {
  it('should play until one card has all the cards', () => {
    expect(playRecursiveToFinish(player1, player2)).toEqual([
      2,
      [7, 5, 6, 2, 4, 1, 10, 8, 9, 3],
    ]);
  });
  it('should play until one card has all the cards with player one winning', () => {
    expect(playRecursiveToFinish(player2, player1)).toEqual([
      1,
      [7, 5, 6, 2, 4, 1, 10, 8, 9, 3],
    ]);
  });
  it('should play until one card has all the cards with recursion stopper', () => {
    expect(playRecursiveToFinish([43, 19], [2, 29, 14])).toEqual([1, [43, 19]]);
  });
});

describe('calculateWinningScore', () => {
  it('should calculate the winning score', () => {
    expect(calculateWinningScore(player1)).toEqual(78);
  });
});
