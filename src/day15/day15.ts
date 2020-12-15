import { playMemoryGame } from '../utils/memory';

export const day15 = (startingNumbers: number[]) =>
  playMemoryGame(startingNumbers, 2020);

export const day15part2 = (startingNumbers: number[]) =>
  playMemoryGame(startingNumbers, 30000000);
