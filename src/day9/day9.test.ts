import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day9, day9part2 } from './day9';
import { data } from './day9.data';

const testString = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
const testData = parseInput(testString) as number[];

describe('day 9', () => {
  it('test cases', () => {
    expect(day9(testData, 5)).toBe(127);
  });

  it('answer', () => {
    const answer = day9(data, 25);
    logAnswer(answer, 9, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1309761972);
  });
});

describe('day 9 part 2', () => {
  it('test cases', () => {
    expect(day9part2(testData, 5)).toBe(62);
  });

  it('answer', () => {
    const answer = day9part2(data, 25);
    logAnswer(answer, 9, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(177989832);
  });
});
