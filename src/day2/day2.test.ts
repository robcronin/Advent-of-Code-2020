import { parsePasswordConfigs } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day2, day2part2 } from './day2';
import { data } from './day2.data';

const testString = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

const testInput = parsePasswordConfigs(testString);

describe('day 2', () => {
  it('test cases', () => {
    expect(day2(testInput)).toBe(2);
  });

  it('answer', () => {
    const answer = day2(data);
    logAnswer(answer, 2, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(603);
  });
});

describe('day 2 part 2', () => {
  it('test cases', () => {
    expect(day2part2(testInput)).toBe(1);
  });

  it('answer', () => {
    const answer = day2part2(data);
    logAnswer(answer, 2, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(404);
  });
});
