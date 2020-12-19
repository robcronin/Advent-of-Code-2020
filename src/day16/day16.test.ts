import { parseTicketInfo } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day16, day16part2 } from './day16';
import { data } from './day16.data';

const testString = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;
const testData = parseTicketInfo(testString);

const testString2 = `class: 0-1 or 4-19
departure row: 0-5 or 8-19
departure seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;
const testData2 = parseTicketInfo(testString2);

describe('day 16', () => {
  it('test cases', () => {
    expect(day16(testData)).toBe(71);
  });

  it('answer', () => {
    const answer = day16(data);
    logAnswer(answer, 16, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(20060);
  });
});

describe('day 16 part 2', () => {
  it('test cases', () => {
    expect(day16part2(testData2, 'departure')).toBe(143);
  });

  it('answer', () => {
    const answer = day16part2(data, 'departure');
    logAnswer(answer, 16, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2843534243843);
  });
});
