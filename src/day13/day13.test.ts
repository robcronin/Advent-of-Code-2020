import { parseBusSchedule } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day13, day13part2 } from './day13';
import { data } from './day13.data';

const testString = `939
  7,13,x,x,59,x,31,19`;
const testData = parseBusSchedule(testString);

describe('day 13', () => {
  it('test cases', () => {
    expect(day13(testData)).toBe(295);
  });

  it('answer', () => {
    const answer = day13(data);
    logAnswer(answer, 13, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(115);
  });
});

describe('day 13 part 2', () => {
  it('test cases', () => {
    expect(day13part2(testData)).toBe(1068781);
  });

  it('answer', () => {
    const answer = day13part2(data);
    logAnswer(answer, 13, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(756261495958122);
  });
});
