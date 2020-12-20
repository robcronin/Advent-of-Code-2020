import { runCalculation, runSimpleCalculation } from '../newMath';

describe('runSimpleCalculation', () => {
  it('should run with equal + and * precedence', () => {
    expect(runSimpleCalculation('2 + 3 * 5', false)).toBe(25);
    expect(runSimpleCalculation('1 + 2 * 3 + 4 * 5 + 6', false)).toBe(71);
  });
  it('should throw error if brackets in simple expressions', () => {
    expect(() => runSimpleCalculation('2 + (3 * 5)', false)).toThrowError(
      'Trying to run simple calculation on expression with brackets',
    );
  });
});

describe('runSimpleCalculation WithPrecedence', () => {
  it('should run with equal + and * precedence', () => {
    expect(runSimpleCalculation('2 + 3 * 5', true)).toBe(25);
    expect(runSimpleCalculation('1 + 2 * 3 + 4 * 5 + 6', true)).toBe(231);
  });
});

describe('runCalculation', () => {
  it('should run with equal + and * precedence', () => {
    expect(runCalculation('2 + 3 * 5', false)).toBe(25);
    expect(runCalculation('1 + 2 * 3 + 4 * 5 + 6', false)).toBe(71);
  });
  it('should run with single parenthesis', () => {
    expect(runCalculation('2 * 3 + (4 * 5)', false)).toBe(26);
  });
  it('should run with two parentheses', () => {
    expect(
      runCalculation('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', false),
    ).toBe(12240);
  });
  it('should run with multiple parentheses', () => {
    expect(
      runCalculation('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', false),
    ).toBe(13632);
  });
});
