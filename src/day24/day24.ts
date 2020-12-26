import {
  countBlackTiles,
  flipTiles,
  runConwayIterationNumTimes,
} from '../utils/hexagon';
import { TileDirection } from '../utils/input';

export const day24 = (allTileDirections: TileDirection[][]) => {
  const grid = flipTiles(allTileDirections);
  return countBlackTiles(grid);
};
export const day24part2 = (allTileDirections: TileDirection[][]) => {
  const grid = flipTiles(allTileDirections);
  const newGrid = runConwayIterationNumTimes(grid, 100);
  return countBlackTiles(newGrid);
};
