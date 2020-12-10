import { parseInput } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day10, day10part2 } from './day10';
import { data } from './day10.data';

const smallTestString = `16
10
15
5
1
11
7
19
6
12
4`;
const testString = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
const smallTestData = parseInput(smallTestString) as number[];
const testData = parseInput(testString) as number[];

describe('day 10', () => {
  it('small test cases', () => {
    expect(day10(smallTestData)).toBe(35);
  });
  it('test cases', () => {
    expect(day10(testData)).toBe(220);
  });

  it('answer', () => {
    const answer = day10(data);
    logAnswer(answer, 10, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1820);
  });
});

describe('day 10 part 2', () => {
  it('small test cases', () => {
    expect(day10part2(smallTestData)).toBe(8);
  });
  it('test cases', () => {
    expect(day10part2(testData)).toBe(19208);
  });

  it('answer', () => {
    const answer = day10part2(data);
    logAnswer(answer, 10, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(3454189699072);
  });
});
