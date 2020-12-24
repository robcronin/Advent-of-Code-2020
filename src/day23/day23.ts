import {
  findProductNextTwoCups,
  generateExtraCups,
  getCupsAfter1,
  playNumCupRounds,
} from '../utils/cups';
import { LinkedList } from '../utils/linkedList';

export const day23 = (startingCups: number[], numRounds: number) => {
  const cupsList = new LinkedList();
  cupsList.createFromArray(startingCups);
  playNumCupRounds(cupsList, numRounds);
  return getCupsAfter1(cupsList);
};

export const day23part2 = (startingCups: number[]) => {
  const cupsList = new LinkedList();
  const extraCups = generateExtraCups(startingCups, 1000000);
  cupsList.createFromArray(extraCups);

  playNumCupRounds(cupsList, 10000000);
  return findProductNextTwoCups(cupsList, 1);
};
