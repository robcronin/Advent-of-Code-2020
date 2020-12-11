import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day11, day11part2 } from './day11';
import { data } from './day11.data';

const testString = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
const testData = parseInput(testString) as string[];

describe('day 11', () => {
  it('test cases', () => {
    expect(day11(testData)).toBe(37);
  });

  it('answer', () => {
    const answer = day11(data);
    logAnswer(answer, 11, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2359);
  });
});

describe('day 11 part 2', () => {
  it('test cases', () => {
    expect(day11part2(testData)).toBe(26);
  });

  it('answer', () => {
    const answer = day11part2(data);
    logAnswer(answer, 11, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2131);
  });
});
