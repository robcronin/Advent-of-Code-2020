export const sumArrayByFormula = <T>(
  array: T[],
  formula: (input: T) => number,
): number => array.reduce((result, element) => result + formula(element), 0);

export const countArrayByCondition = <T>(
  array: T[],
  formula: (input: T) => boolean,
): number =>
  array.reduce((result, element) => result + (formula(element) ? 1 : 0), 0);
