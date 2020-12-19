import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day17, day17part2 } from './day17';
import { data } from './day17.data';

const testString = `.#.
..#
###`;
const testData = parseInput(testString) as string[];

describe('day 17', () => {
  it('test cases', () => {
    expect(day17(testData)).toBe(112);
  });

  it('answer', () => {
    const answer = day17(data);
    logAnswer(answer, 17, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(353);
  });
});

describe('day 17 part 2', () => {
  it('test cases', () => {
    expect(day17part2(testData)).toBe(848);
  });

  it('answer', () => {
    const answer = day17part2(data);
    logAnswer(answer, 17, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2472);
  });
});
