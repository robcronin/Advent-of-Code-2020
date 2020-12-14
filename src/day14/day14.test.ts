import { parseDockingInstructions } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day14, day14part2 } from './day14';
import { data } from './day14.data';

const testString = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;
const testData = parseDockingInstructions(testString);

const testString2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;
const testData2 = parseDockingInstructions(testString2);

describe('day 14', () => {
  it('test cases', () => {
    expect(day14(testData)).toBe(BigInt(165));
  });

  it('answer', () => {
    const answer = day14(data);
    logAnswer(answer, 14, 1);
    expect(typeof answer).toBe('bigint');
    expect(answer).toBe(BigInt(17028179706934));
  });
});

describe('day 14 part 2', () => {
  it('test cases', () => {
    expect(day14part2(testData2)).toBe(BigInt(208));
  });

  it('answer', () => {
    const answer = day14part2(data);
    logAnswer(answer, 14, 2);
    expect(typeof answer).toBe('bigint');
    expect(answer).toBe(BigInt(3683236147222));
  });
});
