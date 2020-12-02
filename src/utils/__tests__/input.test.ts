import { parseInput, parsePasswordConfigs } from '../input';

test('Parses a newline delimited array of numbers', () => {
  const input = `142195
  119326
  -57976`;
  expect(parseInput(input)).toStrictEqual([142195, 119326, -57976]);
});

test('Parses a comma delimited array of numbers', () => {
  const input = '1,0,0,3,-1';
  expect(parseInput(input)).toStrictEqual([1, 0, 0, 3, -1]);
});

test('Parses a newline delimited array of strings', () => {
  const input = `YP6)HRL
  5SN)Z3H
  46K)CGP`;
  expect(parseInput(input)).toStrictEqual(['YP6)HRL', '5SN)Z3H', '46K)CGP']);
});

test('Parses a comma delimited array of strings', () => {
  const input = 'R1010,D422,L354,U494';
  expect(parseInput(input)).toStrictEqual(['R1010', 'D422', 'L354', 'U494']);
});

test('Returns an array if no delimiter present', () => {
  const input = '22222';
  expect(parseInput(input)).toStrictEqual([2, 2, 2, 2, 2]);
});

test('parsePasswordConfigs', () => {
  const input = `1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc`;
  expect(parsePasswordConfigs(input)).toEqual([
    {
      start: 1,
      end: 3,
      letter: 'a',
      password: 'abcde',
    },
    {
      start: 1,
      end: 3,
      letter: 'b',
      password: 'cdefg',
    },
    {
      start: 2,
      end: 9,
      letter: 'c',
      password: 'ccccccccc',
    },
  ]);
});
