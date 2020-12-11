type SeatType = 'L' | '#' | '.';

export const getDimensions = (seatingPlan: string[]) => ({
  rows: seatingPlan.length,
  cols: seatingPlan[0].length,
});

export const getClosestNeighbours = (
  seatingPlan: string[],
  i: number,
  j: number,
): Record<SeatType, number> => {
  const { rows, cols } = getDimensions(seatingPlan);
  const neighbours = { L: 0, '#': 0, '.': 0 };
  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rows - 1); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, cols - 1); y++) {
      if (x !== i || y !== j) {
        const currentState = seatingPlan[x][y] as SeatType;
        neighbours[currentState]++;
      }
    }
  }
  return neighbours;
};

export const getNextChair = (
  seatingPlan: string[],
  i: number,
  j: number,
  rowDir: number,
  colDir: number,
): SeatType | undefined => {
  const { rows, cols } = getDimensions(seatingPlan);
  let x = i + rowDir;
  let y = j + colDir;

  if (x < 0 || y < 0 || x >= rows || y >= cols) return undefined;
  while (x >= 0 && y >= 0 && x < rows && y < cols) {
    const currentState = seatingPlan[x][y] as SeatType;
    if (currentState !== '.') {
      return currentState;
    }
    x += rowDir;
    y += colDir;
  }
  return '.';
};

export const getFirstNeighbours = (
  seatingPlan: string[],
  i: number,
  j: number,
): Record<SeatType, number> => {
  const neighbours = { L: 0, '#': 0, '.': 0 };

  for (let rowDir = -1; rowDir <= 1; rowDir++) {
    for (let colDir = -1; colDir <= 1; colDir++) {
      if (!(rowDir === 0 && colDir === 0)) {
        const nextChar = getNextChair(seatingPlan, i, j, rowDir, colDir);
        if (nextChar) neighbours[nextChar]++;
      }
    }
  }

  return neighbours;
};

export const runIteration = (
  seatingPlan: string[],
  occupiedThreshold: number,
  neighbourType: 'closest' | 'first',
): { newSeatingPlan: string[]; numChanges: number } => {
  const { rows, cols } = getDimensions(seatingPlan);
  let numChanges = 0;
  const newSeatingPlan: string[] = [];
  const getNeighbours =
    neighbourType === 'closest' ? getClosestNeighbours : getFirstNeighbours;

  for (let i = 0; i < rows; i++) {
    newSeatingPlan.push('');
    for (let j = 0; j < cols; j++) {
      const currentState = seatingPlan[i][j];
      const neighbours = getNeighbours(seatingPlan, i, j);
      if (currentState === 'L' && neighbours['#'] === 0) {
        newSeatingPlan[i] += '#';
        numChanges++;
      } else if (currentState === '#' && neighbours['#'] >= occupiedThreshold) {
        newSeatingPlan[i] += 'L';
        numChanges++;
      } else {
        newSeatingPlan[i] += currentState;
      }
    }
  }
  return { newSeatingPlan, numChanges };
};

export const countSeatTypes = (
  seatingPlan: string[],
): Record<SeatType, number> => {
  const { rows, cols } = getDimensions(seatingPlan);
  const seatTypes = { L: 0, '#': 0, '.': 0 };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentState = seatingPlan[i][j] as SeatType;
      seatTypes[currentState]++;
    }
  }
  return seatTypes;
};

export const runUntilStable = (
  seatingPlan: string[],
  occupiedThreshold: number,
  neighbourType: 'closest' | 'first',
) => {
  while (true) {
    const { newSeatingPlan, numChanges } = runIteration(
      seatingPlan,
      occupiedThreshold,
      neighbourType,
    );
    seatingPlan = newSeatingPlan;
    if (numChanges === 0) break;
  }
  return seatingPlan;
};
