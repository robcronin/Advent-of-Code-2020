import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day5, day5part2 } from './day5';
import { data } from './day5.data';

const testString = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;
const testData = parseInput(testString) as string[];

describe('day 5', () => {
  it('test cases', () => {
    expect(day5(testData)).toBe(820);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(930);
  });
});

describe('day 5 part 2', () => {
  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(515);
  });
});
