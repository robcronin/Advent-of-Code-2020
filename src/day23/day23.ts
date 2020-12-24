import {
  findProductNextTwoCups,
  generateExtraCups,
  getCupsAfter1,
  playNumCupRounds,
} from '../utils/cups';

export const day23 = (startingCups: number[]) => {
  const endCups = playNumCupRounds(startingCups, 100);
  return getCupsAfter1(endCups);
};

export const day23part2 = (startingCups: number[]) => {
  const extraCups = generateExtraCups(startingCups, 1000000);
  const endCups = playNumCupRounds(extraCups, 300);
  return findProductNextTwoCups(endCups, 1);
};
