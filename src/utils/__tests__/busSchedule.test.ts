import {
  getFirstTimeBusesLeaveOnOffsets,
  getLCMWithOffset,
  getMinWaitTimeAndId,
  getWaitTime,
  parseBusesWithOffsets,
  parseInserviceBuses,
} from '../busSchedule';
import { BusSchedule } from '../input';

const testBusSchedule: BusSchedule = {
  earliestDepart: 939,
  busIds: ['7', '13', 'x', 'x', '59', 'x', '31', '19'],
};

test('parseInserviceBuses', () => {
  expect(parseInserviceBuses(['12', 'x', '47', 'x'])).toEqual([12, 47]);
});

test('parseBusesWithOffsets', () => {
  expect(parseBusesWithOffsets(['12', 'x', '47', 'x'])).toEqual([
    { busId: 12, offset: 0 },
    { busId: 47, offset: 2 },
  ]);
});

describe('getWaitTime', () => {
  it('should get wait time', () => {
    expect(getWaitTime(939, 59)).toBe(5);
  });
  it('should get wait time if 0', () => {
    expect(getWaitTime(944, 59)).toBe(0);
  });
});

test('getMinWaitTimeAndId', () => {
  expect(getMinWaitTimeAndId(testBusSchedule)).toEqual({
    minWaitTime: 5,
    minBusId: 59,
  });
});

describe('getLCMWithOffset', () => {
  it('should return for 7 and 13 with offset 0 from 0', () => {
    expect(getLCMWithOffset(7, 13, 0, 0)).toBe(0);
  });
  it('should return for 7 and 13 with offset 0 from 7', () => {
    expect(getLCMWithOffset(7, 13, 0, 7)).toBe(91);
  });
  it('should return for 7 and 13 with offset 1 from 0', () => {
    expect(getLCMWithOffset(7, 13, 1, 0)).toBe(77);
  });
});

describe('getFirstTimeBusesLeaveOnOffsets', () => {
  it('should work on small input', () => {
    expect(getFirstTimeBusesLeaveOnOffsets(['17', 'x', '13', '19'])).toBe(3417);
  });
  it('should work on small input', () => {
    expect(getFirstTimeBusesLeaveOnOffsets(['67', '7', 'x', '59', '61'])).toBe(
      1261476,
    );
  });
  it('should work on small input', () => {
    expect(getFirstTimeBusesLeaveOnOffsets(['1789', '37', '47', '1889'])).toBe(
      1202161486,
    );
  });
});
