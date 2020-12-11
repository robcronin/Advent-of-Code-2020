import { countSeatTypes, runUntilStable } from '../utils/seatingPlan';

export const day11 = (seatingPlan: string[]) => {
  const stableSeatingPlan = runUntilStable(seatingPlan, 4, 'closest');
  const stableSeatTypes = countSeatTypes(stableSeatingPlan);
  return stableSeatTypes['#'];
};

export const day11part2 = (seatingPlan: string[]) => {
  const stableSeatingPlan = runUntilStable(seatingPlan, 5, 'first');
  const stableSeatTypes = countSeatTypes(stableSeatingPlan);
  return stableSeatTypes['#'];
};
