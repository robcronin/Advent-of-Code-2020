import {
  findProductNextTwoCups,
  generateExtraCups,
  getCupsAfter1,
  playNumCupRounds,
} from '../utils/cups';
import { LinkedList } from '../utils/linkedList';

export const day23 = (startingCups: number[], numRounds: number) => {
  const cupsList = new LinkedList(startingCups);
  playNumCupRounds(cupsList, numRounds);
  return getCupsAfter1(cupsList);
};

export const day23part2 = (startingCups: number[], numRounds: number) => {
  const extraCups = generateExtraCups(startingCups, 1000000);
  const cupsList = new LinkedList(extraCups);

  playNumCupRounds(cupsList, numRounds);
  return findProductNextTwoCups(cupsList, 1);
};
