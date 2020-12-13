import {
  getFirstTimeBusesLeaveOnOffsets,
  getMinWaitTimeAndId,
} from '../utils/busSchedule';
import { BusSchedule } from '../utils/input';

export const day13 = (busSchedule: BusSchedule) => {
  const { minWaitTime, minBusId } = getMinWaitTimeAndId(busSchedule);
  return minWaitTime * minBusId;
};

export const day13part2 = (busSchedule: BusSchedule) =>
  getFirstTimeBusesLeaveOnOffsets(busSchedule.busIds);
