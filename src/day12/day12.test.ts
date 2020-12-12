import { parseShipNavigationInstructions } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day12, day12part2 } from './day12';
import { data } from './day12.data';

const testString = `F10
N3
F7
R90
F11`;
const testData = parseShipNavigationInstructions(testString);

describe('day 12', () => {
  it('test cases', () => {
    expect(day12(testData)).toBe(25);
  });

  it('answer', () => {
    const answer = day12(data);
    logAnswer(answer, 12, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(590);
  });
});

describe('day 12 part 2', () => {
  it('test cases', () => {
    expect(day12part2(testData)).toBe(286);
  });

  it('answer', () => {
    const answer = day12part2(data);
    logAnswer(answer, 12, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(42013);
  });
});
