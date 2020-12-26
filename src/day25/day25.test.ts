import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day25 } from './day25';
import { data } from './day25.data';

const testString = `5764801
17807724`;
const testData = parseInput(testString) as number[];

describe('day 25', () => {
  it('test cases', () => {
    expect(day25(testData)).toBe(14897079);
  });

  it('answer', () => {
    const answer = day25(data);
    logAnswer(answer, 25, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(16933668);
  });
});
