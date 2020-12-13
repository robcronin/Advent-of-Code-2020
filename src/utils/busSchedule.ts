import { BusSchedule } from './input';

export const parseInserviceBuses = (busIds: string[]): number[] =>
  busIds.filter((busId) => busId !== 'x').map((busId) => +busId);

export const parseBusesWithOffsets = (
  busIds: string[],
): { busId: number; offset: number }[] =>
  busIds
    .map((busId, index) => ({ busId, offset: index }))
    .filter((busIdAndOffset) => busIdAndOffset.busId !== 'x')
    .map((busIdAndOffset) => ({
      busId: +busIdAndOffset.busId,
      offset: busIdAndOffset.offset,
    }));

export const getWaitTime = (time: number, busId: number) =>
  (busId - (time % busId)) % busId;

export const getMinWaitTimeAndId = (busSchedule: BusSchedule) => {
  const { earliestDepart, busIds } = busSchedule;
  const inServiceBusIds = parseInserviceBuses(busIds);
  let minWaitTime = getWaitTime(earliestDepart, inServiceBusIds[0]);
  let minBusId = inServiceBusIds[0];
  inServiceBusIds.forEach((busId) => {
    const waitTime = getWaitTime(earliestDepart, busId);
    if (waitTime < minWaitTime) {
      minWaitTime = waitTime;
      minBusId = busId;
    }
  });
  return { minWaitTime, minBusId };
};

export const getLCMWithOffset = (
  interval: number,
  y: number,
  offset: number,
  start: number,
): number => {
  let result = start;
  while (true) {
    if ((result + offset) % y === 0) break;
    result += interval;
  }
  return result;
};

export const getFirstTimeBusesLeaveOnOffsets = (busIds: string[]) => {
  const busesWithOffsets = parseBusesWithOffsets(busIds);

  let result = 0;
  let interval = 1;
  busesWithOffsets.forEach((el) => {
    result = getLCMWithOffset(interval, el.busId, el.offset, result);
    interval *= el.busId;
  });
  return result;
};
