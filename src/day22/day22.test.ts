import { parseStartingHands } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day22, day22part2 } from './day22';
import { data } from './day22.data';

const testString = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;
const testData = parseStartingHands(testString);

describe('day 22', () => {
  it('test cases', () => {
    expect(day22(testData)).toBe(306);
  });

  it('answer', () => {
    const answer = day22(data);
    logAnswer(answer, 22, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(35013);
  });
});

describe('day 22 part 2', () => {
  it('test cases', () => {
    expect(day22part2(testData)).toBe(291);
  });

  it('answer', () => {
    const answer = day22part2(data);
    logAnswer(answer, 22, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(32806);
  });
});
