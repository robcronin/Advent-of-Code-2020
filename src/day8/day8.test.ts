import { parseGameBootInstructions } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day8, day8part2 } from './day8';
import { data } from './day8.data';

const testString = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
const testData = parseGameBootInstructions(testString);

describe('day 8', () => {
  it('test cases', () => {
    expect(day8(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day8(data);
    logAnswer(answer, 8, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1563);
  });
});

describe('day 8 part 2', () => {
  it('test cases', () => {
    expect(day8part2(testData)).toBe(8);
  });

  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(767);
  });
});
