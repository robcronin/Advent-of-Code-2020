import { getSeatNum } from '../utils/plane';

export const day5 = (input: string[]) => {
  return input.reduce((result, seatConfig) => {
    const seatNum = getSeatNum(seatConfig);
    return seatNum > result ? seatNum : result;
  }, 0);
};

export const day5part2 = (input: string[]) => {
  let result;
  input
    .map((seatConfig) => getSeatNum(seatConfig))
    .sort((a, b) => a - b)
    .some((seatNum, index, orderedSeats) => {
      if (orderedSeats[index + 1] - seatNum !== 1) {
        result = seatNum + 1;
        return true;
      }
    });

  return result;
};
