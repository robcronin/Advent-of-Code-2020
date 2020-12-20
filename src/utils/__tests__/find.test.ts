import { findAllIndexesOfChar, findLastIncidentBeforeIndex } from '../find';

describe('findAllIndexesOfChar', () => {
  it('should find all (', () => {
    expect(findAllIndexesOfChar('2 + (3 * 5)', '(')).toEqual([4]);
    expect(findAllIndexesOfChar('2 + (3 * (5))', '(')).toEqual([4, 9]);
  });
});

describe('findLastIncidentBeforeIndex', () => {
  it('should find the last ( before )', () => {
    expect(findLastIncidentBeforeIndex('2 + (3 * (5))', '(', 5)).toEqual(4);
    expect(findLastIncidentBeforeIndex('2 + (3 * (5))', '(', 11)).toEqual(9);
  });
  it('should return -1 if no ( before )', () => {
    expect(findLastIncidentBeforeIndex('2 + 3 * 5))', '(', 5)).toEqual(-1);
  });
});
