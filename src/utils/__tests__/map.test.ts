import { parseInput } from '../input';
import { countTreesOnSlope } from '../map';

const testString = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const testInput = parseInput(testString) as string[];

describe('countTreesOnSlope', () => {
  it('should return number of trees on 3,1 slope', () => {
    expect(countTreesOnSlope(testInput, 3, 1)).toBe(7);
  });
  it('should return number of trees on 5,1 slope', () => {
    expect(countTreesOnSlope(testInput, 5, 1)).toBe(3);
  });
  it('should return number of trees on 1,2 slope', () => {
    expect(countTreesOnSlope(testInput, 1, 2)).toBe(2);
  });
});
