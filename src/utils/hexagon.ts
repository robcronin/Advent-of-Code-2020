import { TileDirection } from './input';

export const getTileCoords = (
  tileDirections: TileDirection[],
): [number, number] => {
  let [x, y] = [0, 0];
  tileDirections.forEach((tileDirection) => {
    if (tileDirection === 'nw') {
      x--;
      y++;
    } else if (tileDirection === 'ne') {
      x++;
      y++;
    } else if (tileDirection === 'se') {
      x++;
      y--;
    } else if (tileDirection === 'sw') {
      x--;
      y--;
    } else if (tileDirection === 'e') x += 2;
    else if (tileDirection === 'w') x -= 2;
    else throw new Error(`Unrecognised direction ${tileDirection}`);
  });
  return [x, y];
};

export const flipTiles = (
  allTileDirections: TileDirection[][],
): Record<number, Record<number, boolean>> => {
  const grid: Record<number, Record<number, boolean>> = {};
  allTileDirections.forEach((tileDirection) => {
    const [x, y] = getTileCoords(tileDirection);
    if (grid[x]) {
      if (grid[x][y]) {
        grid[x][y] = !grid[x][y];
      } else {
        grid[x][y] = true;
      }
    } else {
      grid[x] = { [y]: true };
    }
  });
  return grid;
};

export const countBlackTiles = (
  grid: Record<number, Record<number, boolean>>,
) => {
  let result = 0;
  Object.values(grid).forEach((row) => {
    Object.values(row).forEach((value) => {
      if (value) result++;
    });
  });
  return result;
};

export const getNumBlackNeighbours = (
  x: number,
  y: number,
  grid: Record<number, Record<number, boolean>>,
): number => {
  let neighbours = 0;
  if (grid[x + 2] && grid[x + 2][y]) neighbours++;
  if (grid[x - 2] && grid[x - 2][y]) neighbours++;
  if (grid[x + 1] && grid[x + 1][y + 1]) neighbours++;
  if (grid[x + 1] && grid[x + 1][y - 1]) neighbours++;
  if (grid[x - 1] && grid[x - 1][y + 1]) neighbours++;
  if (grid[x - 1] && grid[x - 1][y - 1]) neighbours++;
  return neighbours;
};

export const runConwayIteration = (
  grid: Record<number, Record<number, boolean>>,
): Record<number, Record<number, boolean>> => {
  const newGrid: Record<number, Record<number, boolean>> = {};
  let [minX, maxX, minY, maxY] = [0, 0, 0, 0];
  Object.keys(grid).forEach((gridKey) => {
    if (+gridKey < minX) minX = +gridKey;
    if (+gridKey > maxX) maxX = +gridKey;
    const row = grid[+gridKey];
    newGrid[+gridKey] = { ...row };
    Object.keys(row).forEach((rowKey) => {
      if (+rowKey < minY) minY = +rowKey;
      if (+rowKey > maxY) maxY = +rowKey;
    });
  });
  minX -= 2;
  minY -= 2;
  maxX += 2;
  maxY += 2;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if ((y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)) {
        const neighbours = getNumBlackNeighbours(x, y, grid);
        if (grid[x] && grid[x][y]) {
          if (neighbours === 0 || neighbours > 2) {
            newGrid[x][y] = false;
          }
        } else {
          if (neighbours === 2) {
            if (newGrid[x]) {
              newGrid[x][y] = true;
            } else {
              newGrid[x] = { [y]: true };
            }
          }
        }
      }
    }
  }
  return newGrid;
};

export const runConwayIterationNumTimes = (
  grid: Record<number, Record<number, boolean>>,
  numTimes: number,
): Record<number, Record<number, boolean>> => {
  let result = grid;
  for (let i = 0; i < numTimes; i++) {
    result = runConwayIteration(result);
  }
  return result;
};
