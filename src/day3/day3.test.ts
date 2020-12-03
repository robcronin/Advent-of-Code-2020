import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day3, day3part2 } from './day3';
import { data } from './day3.data';

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

describe('day 3', () => {
  it('test cases', () => {
    expect(day3(testInput)).toBe(7);
  });

  it('answer', () => {
    const answer = day3(data);
    logAnswer(answer, 3, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(184);
  });
});

describe('day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testInput)).toBe(336);
  });

  it('answer', () => {
    const answer = day3part2(data);
    logAnswer(answer, 3, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2431272960);
  });
});
