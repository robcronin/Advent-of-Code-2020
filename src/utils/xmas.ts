export const doesSumExist = (input: number[], expectedSum: number): boolean => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
      const [x, y] = [input[i], input[j]];
      if (x != y && x + y === expectedSum) return true;
    }
  }
  return false;
};

export const findFirstBrokenSumInput = (
  input: number[],
  preambleLength: number,
): number | undefined => {
  for (let i = preambleLength; i < input.length; i++) {
    if (!doesSumExist(input.slice(i - preambleLength, i), input[i]))
      return input[i];
  }
  return undefined;
};

export const findContiguousValuesForSum = (
  input: number[],
  expectedSum: number,
): number[] | undefined => {
  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    let contiguousValues: number[] = [];
    for (let j = i; j < input.length; j++) {
      const [x, y] = [input[i], input[j]];
      if (sum < expectedSum) {
        sum += y;
        contiguousValues.push(y);
      } else if (sum > expectedSum) {
        break;
      } else {
        return contiguousValues;
      }
    }
  }
};

export const findEncryptionWeakness = (
  input: number[],
  preambleLength: number,
) => {
  const firstBrokenSum = findFirstBrokenSumInput(input, preambleLength);
  if (!firstBrokenSum) throw new Error('Broken sum input not found');
  const contiguousValues = findContiguousValuesForSum(
    input,
    firstBrokenSum,
  ) as number[]; // the broken sum is in the array so a contiguous sum will always exist
  const sortedValues = contiguousValues.sort((a, b) => a - b);
  return sortedValues[0] + sortedValues[sortedValues.length - 1];
};
