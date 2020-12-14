const overrideTo1 = (result: bigint, index: number) =>
  (result |= BigInt(2 ** (35 - index)));

const overrideTo0 = (result: bigint, index: number) =>
  (result &= BigInt(2 ** 36 - 2 ** (35 - index) - 1));

const overrideIndex = (result: bigint, index: number, override: 0 | 1) =>
  override === 0 ? overrideTo0(result, index) : overrideTo1(result, index);

export const applyMask = (mask: string, number: bigint): bigint => {
  let result = number;
  [...mask].forEach((char, index) => {
    if (char === '1') {
      result = overrideIndex(result, index, 1);
    } else if (char === '0') {
      result = overrideIndex(result, index, 0);
    }
  });
  return result;
};

export const applyMask2 = (mask: string, number: bigint): bigint[] => {
  let result = number;
  let floats: number[] = [];
  [...mask].forEach((char, index) => {
    if (char === '1') {
      result = overrideIndex(result, index, 1);
    } else if (char === 'X') {
      floats.push(index);
    }
  });

  // get all permutations of floating numbers
  let perms: Record<number, 0 | 1>[] = [{}];
  floats.forEach((floatIndex) => {
    perms = perms.reduce(
      (acc: Record<number, 0 | 1>[], perm) => [
        ...acc,
        { ...perm },
        { ...perm },
      ],
      [],
    );
    perms.forEach((perm, index) => {
      perm[floatIndex] = (index % 2) as 0 | 1;
    });
  });

  // apply each permutation to current result
  return perms.reduce((acc: bigint[], perm) => {
    let newResult = result;
    Object.entries(perm).forEach(([index, override]) => {
      newResult = overrideIndex(newResult, +index, override);
    });
    return [...acc, newResult];
  }, []);
};
