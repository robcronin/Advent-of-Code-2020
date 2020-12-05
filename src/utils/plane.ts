export const getSeatNum = (seatConfig: string) => {
  return parseInt(seatConfig.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2);
};
