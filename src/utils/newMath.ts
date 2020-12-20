import { findLastIncidentBeforeIndex } from './find';

const runPlusOperationsFirst = (items: string[]): string[] => {
  let result = [...items];
  while (result.includes('+')) {
    const plusIndex = result.indexOf('+');
    result = result
      .slice(0, plusIndex - 1)
      .concat((+result[plusIndex - 1] + +result[plusIndex + 1]).toString())
      .concat(result.slice(plusIndex + 2));
  }
  return result;
};

export const runSimpleCalculation = (
  simpleExpression: string,
  withPrecedence: boolean,
): number => {
  if (simpleExpression.includes('(')) {
    throw new Error(
      'Trying to run simple calculation on expression with brackets',
    );
  }
  let items = simpleExpression.split(' ');
  if (withPrecedence) items = runPlusOperationsFirst(items);
  let result = 0;
  items.unshift('+');
  while (items.length >= 2) {
    const operator = items.shift() as string;
    const nextInput = +(items.shift() as string);
    if (operator === '+') {
      result += nextInput;
    } else {
      result *= nextInput;
    }
  }
  return result;
};

export const runCalculation = (
  calculation: string,
  withPrecedence: boolean,
): number => {
  const firstClose = calculation.indexOf(')');
  if (firstClose !== -1) {
    const matchingOpen = findLastIncidentBeforeIndex(
      calculation,
      '(',
      firstClose,
    );
    const innerCalculation = runSimpleCalculation(
      calculation.slice(matchingOpen + 1, firstClose),
      withPrecedence,
    );
    return runCalculation(
      calculation.replace(
        calculation.slice(matchingOpen, firstClose + 1),
        innerCalculation.toString(),
      ),
      withPrecedence,
    );
  }
  return runSimpleCalculation(calculation, withPrecedence);
};
