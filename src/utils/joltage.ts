export const sortAndAddWallAndDevice = (joltageAdapters: number[]) => {
  const newJoltageAdapters = [...joltageAdapters];
  newJoltageAdapters.push(0);
  const sortedJoltageAdapters = newJoltageAdapters.sort((a, b) => a - b);
  sortedJoltageAdapters.push(
    sortedJoltageAdapters[sortedJoltageAdapters.length - 1] + 3,
  );
  return sortedJoltageAdapters;
};

export const getJoltageDifferences = (
  joltageAdapters: number[],
): Record<number, number> => {
  const sortedJoltageAdapters = sortAndAddWallAndDevice(joltageAdapters);
  return sortedJoltageAdapters.reduce(
    (acc: Record<number, number>, joltageAdapter, index) => {
      const diff = sortedJoltageAdapters[index + 1] - joltageAdapter;
      if (diff) {
        if (acc[diff]) {
          return { ...acc, [diff]: acc[diff] + 1 };
        }
        return { ...acc, [diff]: 1 };
      }
      return acc;
    },
    {},
  );
};

/*
 * Given joltages with gaps of 1 and 3, this generates a conversion
 * from length of consecutive numbers to number of valid permutations
 */
export const generate1And3ValidPermutationsConsecutiveConverter = (
  sequenceLength: number = 3,
  validPermutations: Record<number, number> = { 1: 1, 2: 1, 3: 2 },
): Record<number, number> => {
  const newValidPermutations = { ...validPermutations };
  for (
    let i = Object.keys(validPermutations).length + 1;
    i <= sequenceLength;
    i++
  ) {
    newValidPermutations[i] =
      newValidPermutations[i - 1] +
      validPermutations[i - 2] +
      newValidPermutations[i - 3];
  }
  return newValidPermutations;
};

export const countTotal1And3ValidPermutations = (joltageAdapters: number[]) => {
  const sortedJoltageAdapters = sortAndAddWallAndDevice(joltageAdapters);
  let sequence = 1;
  let result = 1;
  let consecutivePermutationsConverter = generate1And3ValidPermutationsConsecutiveConverter();

  sortedJoltageAdapters.forEach((joltageAdapter, index) => {
    if (sortedJoltageAdapters[index + 1] - joltageAdapter === 3) {
      if (!consecutivePermutationsConverter[sequence]) {
        consecutivePermutationsConverter = generate1And3ValidPermutationsConsecutiveConverter(
          sequence,
          consecutivePermutationsConverter,
        );
      }
      result = result * consecutivePermutationsConverter[sequence];
      sequence = 1;
    } else {
      sequence++;
    }
  });
  return result;
};
