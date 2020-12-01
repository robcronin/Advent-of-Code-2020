export const day1 = (input: number[]) => {
  let result = 0;
  input.some((m) => {
    return input.some((n) => {
      if (m + n === 2020) {
        result = m * n;
        return true;
      }
    });
  });

  return result;
};

export const day1part2 = (input: number[]) => {
  let result = 0;
  input.some((m) => {
    return input.some((n) => {
      return input.some((p) => {
        if (m + n + p === 2020) {
          result = m * n * p;
          return true;
        }
      });
    });
  });

  return result;
};
