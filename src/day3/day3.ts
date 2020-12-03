import { countTreesOnSlope } from '../utils/map';

export const day3 = (input: string[]) => {
  return countTreesOnSlope(input, 3, 1);
};
export const day3part2 = (input: string[]) => {
  return (
    countTreesOnSlope(input, 1, 1) *
    countTreesOnSlope(input, 3, 1) *
    countTreesOnSlope(input, 5, 1) *
    countTreesOnSlope(input, 7, 1) *
    countTreesOnSlope(input, 1, 2)
  );
};
