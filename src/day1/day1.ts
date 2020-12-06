export const day1 = (expenseReport: number[]) => {
  let result = 0;
  expenseReport.some((m) =>
    expenseReport.some((n) => {
      if (m + n === 2020) {
        result = m * n;
        return true;
      }
    }),
  );

  return result;
};

export const day1part2 = (expenseReport: number[]) => {
  let result = 0;
  expenseReport.some((m) =>
    expenseReport.some((n) =>
      expenseReport.some((p) => {
        if (m + n + p === 2020) {
          result = m * n * p;
          return true;
        }
      }),
    ),
  );

  return result;
};
