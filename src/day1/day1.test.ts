import { logAnswer } from '../utils/logging';
import { day1, day1part2 } from './day1';
import { data } from './day1.data';

describe('day 1', () => {
  it('test cases', () => {
    const testData = [1721, 979, 366, 299, 675, 1456];
    expect(day1(testData)).toBe(514579);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(73371);
  });
});

describe('day 1 part 2', () => {
  it('test cases', () => {
    const testData = [1721, 979, 366, 299, 675, 1456];
    expect(day1part2(testData)).toBe(241861950);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(127642310);
  });
});
