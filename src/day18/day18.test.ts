import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day18, day18part2 } from './day18';
import { data } from './day18.data';

const testString = `2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;
const testData = parseInput(testString) as string[];

describe('day 18', () => {
  it('test cases', () => {
    expect(day18(testData)).toBe(26335);
  });

  it('answer', () => {
    const answer = day18(data);
    logAnswer(answer, 18, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(15285807527593);
  });
});

describe('day 18 part 2', () => {
  it('test cases', () => {
    expect(day18part2(testData)).toBe(693891);
  });

  it('answer', () => {
    const answer = day18part2(data);
    logAnswer(answer, 18, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(461295257566346);
  });
});
