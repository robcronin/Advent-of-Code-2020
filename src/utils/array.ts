export const sumArrayByFormula = <T>(
  array: T[],
  formula: (input: T) => number,
): number => array.reduce((result, element) => result + formula(element), 0);

export const multArrayByFormula = <T>(
  array: T[],
  formula: (input: T) => number,
): number => array.reduce((result, element) => result * formula(element), 1);

export const countArrayByCondition = <T>(
  array: T[],
  formula: (input: T) => boolean,
): number =>
  array.reduce((result, element) => result + (formula(element) ? 1 : 0), 0);

export const getMaxInArrayByFormula = <T>(
  array: T[],
  formula: (input: T) => number,
): number =>
  array.reduce((result, element) => {
    const value = formula(element);
    return value > result ? value : result;
  }, formula(array[0]));
