import { countTreesOnSlope } from '../utils/map';

export const day3 = (treeMap: string[]) => countTreesOnSlope(treeMap, 3, 1);

export const day3part2 = (treeMap: string[]) =>
  countTreesOnSlope(treeMap, 1, 1) *
  countTreesOnSlope(treeMap, 3, 1) *
  countTreesOnSlope(treeMap, 5, 1) *
  countTreesOnSlope(treeMap, 7, 1) *
  countTreesOnSlope(treeMap, 1, 2);
