import { multArrayByFormula } from '../utils/array';
import { SatelliteImage } from '../utils/input';
import {
  countHashes,
  fillInImageGrid,
  findSeaMonsters,
  getImageIdsByNumEdges,
  removeSeaMonsters,
} from '../utils/satellite';

export const day20 = (satelliteImages: Record<number, SatelliteImage>) => {
  const corners = getImageIdsByNumEdges(satelliteImages, 2);
  return multArrayByFormula(corners, (el) => el);
};

export const day20part2 = (satelliteImages: Record<number, SatelliteImage>) => {
  const filledInGrid = fillInImageGrid(satelliteImages);
  const { seaMonsterOrientedGrid, seaMonsters } = findSeaMonsters(filledInGrid);
  const removedSeaMonsterGrid = removeSeaMonsters(
    seaMonsterOrientedGrid,
    seaMonsters,
  );
  return countHashes(removedSeaMonsterGrid);
};
