import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day15, day15part2 } from './day15';
import { data } from './day15.data';

const testString = '0,3,6';
const testData = parseInput(testString) as number[];

describe('day 15', () => {
  it('test cases', () => {
    expect(day15(testData)).toBe(436);
  });

  it('answer', () => {
    const answer = day15(data);
    logAnswer(answer, 15, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(203);
  });
});

describe('day 15 part 2', () => {
  it('test cases', () => {
    expect(day15part2(testData)).toBe(175594);
  });

  it('answer', () => {
    const answer = day15part2(data);
    logAnswer(answer, 15, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(9007186);
  });
});
