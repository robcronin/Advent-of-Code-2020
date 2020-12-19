import {
  countActiveCubes,
  runNumConwayIterations,
  setGridFromStartingState,
} from '../utils/conway';

export const day17 = (startingState: string[]) => {
  const grid = setGridFromStartingState(startingState);
  const endGrid = runNumConwayIterations(grid, 6, false);
  return countActiveCubes(endGrid);
};
export const day17part2 = (startingState: string[]) => {
  const grid = setGridFromStartingState(startingState);
  const endGrid = runNumConwayIterations(grid, 6, true);
  return countActiveCubes(endGrid);
};
