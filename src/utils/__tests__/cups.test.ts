import {
  findProductNextTwoCups,
  generateExtraCups,
  getCupsAfter1,
  playCupRound,
  playNumCupRounds,
} from '../cups';
import { LinkedList } from '../linkedList';

describe('playCupRound', () => {
  it('should play normal round', () => {
    const list = new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]);
    playCupRound(list);
    expect(list.convertToArray()).toEqual([2, 8, 9, 1, 5, 4, 6, 7, 3]);
  });
  it('should play a round having to loop back on destination cup', () => {
    const list = new LinkedList([1, 3, 6, 7, 9, 2, 5, 8, 4]);
    playCupRound(list);
    expect(list.convertToArray()).toEqual([9, 3, 6, 7, 2, 5, 8, 4, 1]);
  });
  it("should throw error if destination node doesn't exist", () => {
    const list = new LinkedList([1, 3, 6, 7, 2, 5, 9, 4]);
    expect(() => playCupRound(list)).toThrowError('No node found for value: 8');
  });
});

describe('playNumCupRounds', () => {
  it('should play 10 normal rounds', () => {
    const list = new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]);
    playNumCupRounds(list, 10);
    expect(list.convertToArray()).toEqual([8, 3, 7, 4, 1, 9, 2, 6, 5]);
  });
});

describe('getCupsAfter1', () => {
  it('get the cups after 1', () => {
    expect(getCupsAfter1(new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]))).toEqual(
      25467389,
    );
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
    expect(
      findProductNextTwoCups(new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]), 1),
    ).toEqual(10);
  });
  it('find product after 6', () => {
    expect(
      findProductNextTwoCups(new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]), 6),
    ).toEqual(21);
  });
  it('find product after 7', () => {
    expect(
      findProductNextTwoCups(new LinkedList([3, 8, 9, 1, 2, 5, 4, 6, 7]), 7),
    ).toEqual(24);
  });
  it('should throw error if no cup to the right of 1', () => {
    const list = new LinkedList([1]);
    list.head = null;
    expect(() => findProductNextTwoCups(list, 1)).toThrowError(
      'No cup found to the right of 1',
    );
  });
  it('should throw error if no cup two to the right of 1', () => {
    const list = new LinkedList([1, 2]);
    list.head = null;
    expect(() => findProductNextTwoCups(list, 1)).toThrowError(
      'No cup found two to the right of 1',
    );
  });
});
