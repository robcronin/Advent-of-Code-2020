import { parsePasswordConfigs } from '../input';
import {
  countValidPasswords,
  isValidOldPolicy,
  isValidPolicy,
} from '../password';

describe('isValidOldPolicy', () => {
  it('is valid at start limit', () => {
    expect(
      isValidOldPolicy({
        start: 2,
        end: 4,
        letter: 'a',
        password: 'abacc',
      }),
    ).toBe(true);
  });
  it('is valid at end limit', () => {
    expect(
      isValidOldPolicy({
        start: 2,
        end: 4,
        letter: 'a',
        password: 'abaccaa',
      }),
    ).toBe(true);
  });
  it('is not valid', () => {
    expect(
      isValidOldPolicy({
        start: 2,
        end: 3,
        letter: 'a',
        password: 'abaccaa',
      }),
    ).toBe(false);
  });
});

describe('isValidPolicy', () => {
  it('is valid for letter at first position', () => {
    expect(
      isValidPolicy({
        start: 2,
        end: 4,
        letter: 'a',
        password: 'aaabc',
      }),
    ).toBe(true);
  });
  it('is valid for letter at last position', () => {
    expect(
      isValidPolicy({
        start: 2,
        end: 4,
        letter: 'a',
        password: 'abaacaa',
      }),
    ).toBe(true);
  });
  it('is not valid for no matches', () => {
    expect(
      isValidPolicy({
        start: 2,
        end: 3,
        letter: 'z',
        password: 'abaccaa',
      }),
    ).toBe(false);
  });
  it('is not valid for 2 matches', () => {
    expect(
      isValidPolicy({
        start: 2,
        end: 3,
        letter: 'a',
        password: 'aaaccaa',
      }),
    ).toBe(false);
  });
});

describe('countValidPasswords', () => {
  it('is valid for letter at first position', () => {
    const testString = `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`;

    const testInput = parsePasswordConfigs(testString);
    expect(countValidPasswords(testInput, isValidOldPolicy)).toBe(2);
  });
});
