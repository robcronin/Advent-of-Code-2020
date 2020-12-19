export type State = '.' | '#';
export type ConwayGrid = Record<
  number,
  Record<number, Record<number, Record<number, State>>>
>;

export const getGridState = (
  grid: ConwayGrid,
  x: number,
  y: number,
  z: number,
  w: number,
): State => {
  if (grid[x] && grid[x][y] && grid[x][y][z] && grid[x][y][z][w])
    return grid[x][y][z][w];
  return '.';
};

export const setGridStateInPlace = (
  grid: ConwayGrid,
  newState: State,
  x: number,
  y: number,
  z: number,
  w: number,
): void => {
  if (grid[x]) {
    if (grid[x][y]) {
      if (grid[x][y][z]) {
        grid[x][y][z][w] = newState;
      } else {
        grid[x][y][z] = { [w]: newState };
      }
    } else {
      grid[x][y] = { [z]: { [w]: newState } };
    }
  } else {
    grid[x] = { [y]: { [z]: { [w]: newState } } };
  }
};

export const setGridFromStartingState = (
  startingState: string[],
): ConwayGrid => {
  const grid: ConwayGrid = {};
  startingState.forEach((row, posy) => {
    [...row].forEach((state, x) => {
      setGridStateInPlace(grid, state as State, x, -posy, 0, 0);
    });
  });
  return grid;
};

export const duplicateConwayGrid = (grid: ConwayGrid): ConwayGrid =>
  JSON.parse(JSON.stringify(grid));

export const getMinMaxKeys = (
  obj: Record<number, any> | undefined,
): [number, number] => {
  if (!obj) return [0, 0];
  const keys = Object.keys(obj).map((key) => +key);
  return [Math.min(...keys), Math.max(...keys)];
};

export const getMinMaxGrid = (
  grid: ConwayGrid,
): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  minW: number;
  maxW: number;
} => {
  const [minX, maxX] = getMinMaxKeys(grid);
  let [minY, maxY, minZ, maxZ, minW, maxW] = [0, 0, 0, 0, 0, 0];
  Object.values(grid).forEach((yzw) => {
    const [localMinY, localMaxY] = getMinMaxKeys(yzw);
    if (localMinY < minY) minY = localMinY;
    if (localMaxY > maxY) maxY = localMaxY;
    Object.values(yzw).forEach((zw) => {
      const [localMinZ, localMaxZ] = getMinMaxKeys(zw);
      if (localMinZ < minZ) minZ = localMinZ;
      if (localMaxZ > maxZ) maxZ = localMaxZ;
      Object.values(zw).forEach((w) => {
        const [localMinW, localMaxW] = getMinMaxKeys(w);
        if (localMinW < minW) minW = localMinW;
        if (localMaxW > maxW) maxW = localMaxW;
      });
    });
  });
  return { minX, maxX, minY, maxY, minZ, maxZ, minW, maxW };
};

export const getNumActiveNeighbours = (
  grid: ConwayGrid,
  x: number,
  y: number,
  z: number,
  w: number,
): number => {
  let numActiveNeighbours = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let m = w - 1; m <= w + 1; m++) {
          if (!(i === x && j === y && k === z && m === w)) {
            if (getGridState(grid, i, j, k, m) === '#') numActiveNeighbours++;
          }
        }
      }
    }
  }
  return numActiveNeighbours;
};

export const countActiveCubes = (grid: ConwayGrid): number => {
  let activeCubes = 0;
  Object.values(grid).forEach((yzw) => {
    Object.values(yzw).forEach((zw) => {
      Object.values(zw).forEach((w) => {
        Object.values(w).forEach((state) => {
          if (state === '#') activeCubes++;
        });
      });
    });
  });
  return activeCubes;
};

export const runConwayIteration = (
  grid: ConwayGrid,
  hyperMode: boolean,
): ConwayGrid => {
  const newGrid = {};
  const { minX, maxX, minY, maxY, minZ, maxZ, minW, maxW } = getMinMaxGrid(
    grid,
  );
  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        for (let w = minW - 1; w <= maxW + 1; w++) {
          if (w === 0 || hyperMode) {
            const numActiveNeighbours = getNumActiveNeighbours(
              grid,
              x,
              y,
              z,
              w,
            );
            const currentState = getGridState(grid, x, y, z, w);
            if (currentState === '#') {
              if (numActiveNeighbours === 2 || numActiveNeighbours === 3) {
                setGridStateInPlace(newGrid, '#', x, y, z, w);
              }
            } else {
              if (numActiveNeighbours === 3) {
                setGridStateInPlace(newGrid, '#', x, y, z, w);
              }
            }
          }
        }
      }
    }
  }
  return newGrid;
};

export const runNumConwayIterations = (
  grid: ConwayGrid,
  numIterations: number,
  hyperMode: boolean,
): ConwayGrid => {
  let dupGrid = duplicateConwayGrid(grid);
  for (let iter = 0; iter < numIterations; iter++) {
    dupGrid = runConwayIteration(dupGrid, hyperMode);
  }
  return dupGrid;
};

/* istanbul ignore next */
export const printConwayGrid = (grid: ConwayGrid) => {
  const { minX, maxX, minY, maxY, minZ, maxZ } = getMinMaxGrid(grid);
  for (let z = minZ; z <= maxZ; z++) {
    process.stdout.write(`z = ${z}\n`);
    for (let y = maxY; y >= minY; y--) {
      let line = '';
      for (let x = minX; x <= maxX; x++) {
        line += getGridState(grid, x, y, z, 0);
      }
      process.stdout.write(`${line}\n`);
    }
  }
};
