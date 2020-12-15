export const playMemoryGame = (
  startingNumbers: number[],
  turns: number,
): number => {
  const numsCount: Map<number, number> = new Map();

  let lastNumber: number = -1;
  let prevCalled: number | undefined = undefined;
  for (let turn = 0; turn < turns; turn++) {
    let newNumber = 0;
    if (startingNumbers[turn] !== undefined) {
      newNumber = startingNumbers[turn];
    } else {
      if (prevCalled !== undefined) {
        newNumber = turn - 1 - prevCalled;
      }
    }
    prevCalled = numsCount.get(newNumber);
    numsCount.set(newNumber, turn);
    lastNumber = newNumber;
  }
  return lastNumber;
};
