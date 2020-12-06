import { getMaxInArrayByFormula } from '../utils/array';
import { getSeatNum } from '../utils/plane';

export const day5 = (seatConfigs: string[]) =>
  getMaxInArrayByFormula(seatConfigs, getSeatNum);

export const day5part2 = (input: string[]) => {
  let result;
  input
    .map(getSeatNum)
    .sort((a, b) => a - b)
    .some((seatNum, index, orderedSeats) => {
      if (orderedSeats[index + 1] - seatNum !== 1) {
        result = seatNum + 1;
        return true;
      }
    });

  return result;
};
