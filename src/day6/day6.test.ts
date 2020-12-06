import { parseCustomsGroupAnswers } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day6, day6part2 } from './day6';
import { data } from './day6.data';

const testString = `abc

a
b
c

ab
ac

a
a
a
a

b`;
const testData = parseCustomsGroupAnswers(testString);

describe('day 6', () => {
  it('test cases', () => {
    expect(day6(testData)).toBe(11);
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(6521);
  });
});

describe('day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(3305);
  });
});
