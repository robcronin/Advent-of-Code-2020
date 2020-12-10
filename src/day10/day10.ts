import {
  countTotal1And3ValidPermutations,
  getJoltageDifferences,
} from '../utils/joltage';

export const day10 = (joltageAdapters: number[]) => {
  const joltageDifferences = getJoltageDifferences(joltageAdapters);
  return joltageDifferences[1] * joltageDifferences[3];
};

export const day10part2 = countTotal1And3ValidPermutations;
