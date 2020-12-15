import { playMemoryGame } from '../memory';

test('playMemoryGame', () => {
  expect(playMemoryGame([0, 3, 6], 9)).toEqual(4);
});
