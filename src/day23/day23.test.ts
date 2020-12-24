import { parseStartingCups } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day23, day23part2 } from './day23';
import { data } from './day23.data';

const testString = '389125467';
const testData = parseStartingCups(testString);

describe.only('day 23', () => {
  it.skip('small test cases', () => {
    expect(day23(testData, 10)).toBe(92658374);
  });
  it('test cases', () => {
    expect(day23(testData, 100)).toBe(67384529);
  });

  it('answer', () => {
    const answer = day23(data, 100);
    logAnswer(answer, 23, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(39564287);
  });
});

describe('day 23 part 2', () => {
  it('test cases', () => {
    expect(day23part2(testData)).toBe(149245887792);
  });

  it('answer', () => {
    const answer = day23part2(data);
    logAnswer(answer, 23, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(23);
  });
});
