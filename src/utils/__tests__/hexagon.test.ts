import {
  countBlackTiles,
  flipTiles,
  getNumBlackNeighbours,
  getTileCoords,
  runConwayIteration,
  runConwayIterationNumTimes,
} from '../hexagon';

describe('getTileCoords', () => {
  it('should return origin', () => {
    expect(getTileCoords([])).toEqual([0, 0]);
  });
  it('should return after multiple directions', () => {
    expect(getTileCoords(['e', 'se', 'ne', 'e'])).toEqual([6, 0]);
  });
  it('should return origin after multiple directions', () => {
    expect(getTileCoords(['nw', 'w', 'sw', 'e', 'e'])).toEqual([0, 0]);
  });
  it('should throw an error if unrecognised direction passed', () => {
    // @ts-expect-error: Testign error if bad type passed
    expect(() => getTileCoords(['n', 'w', 'sw', 'e', 'e'])).toThrowError(
      'Unrecognised direction n',
    );
  });
});

describe('flipTiles', () => {
  it('should flip the tiles from directions', () => {
    expect(
      flipTiles([
        ['e', 'se', 'ne', 'e'],
        ['nw', 'w', 'sw', 'e', 'e'],
        ['e', 'se', 'ne', 'e'],
      ]),
    ).toEqual({ '0': { '0': true }, '6': { '0': false } });
  });
});

describe('countBlackTiles', () => {
  it('should count black tiles', () => {
    expect(
      countBlackTiles({ '0': { '0': true }, '6': { '0': false } }),
    ).toEqual(1);
  });
});

describe('getNumBlackNeighbours', () => {
  it('should count num neighbouring black tiles', () => {
    expect(
      getNumBlackNeighbours(2, 0, { '0': { '0': true }, '6': { '0': false } }),
    ).toEqual(1);
  });
});

describe('runConwayIteration', () => {
  it('run conway iteration', () => {
    expect(
      runConwayIteration({
        '0': { '0': true },
        '1': { '1': true },
        '2': { '0': true },
      }),
    ).toEqual({
      '-1': {
        '1': true,
      },
      '0': {
        '0': true,
      },
      '1': {
        '-1': true,
        '1': true,
      },
      '2': {
        '0': true,
      },
      '3': {
        '1': true,
      },
    });
  });
});

describe('runConwayIterationNumTimes', () => {
  it('run conway iteration', () => {
    expect(
      runConwayIterationNumTimes(
        {
          '0': { '0': true },
          '1': { '1': true },
          '2': { '0': true },
        },
        10,
      ),
    ).toEqual({
      '-1': { '-1': false, '1': false },
      '-2': { '0': false, '2': false },
      '-3': { '-1': false, '1': false },
      '-4': { '2': false },
      '0': { '-2': false, '0': false, '2': false },
      '1': { '-1': false, '-3': false, '1': false, '3': false },
      '2': { '-2': false, '0': false, '2': false },
      '3': { '-1': false, '1': false },
      '4': { '0': false, '2': false },
      '5': { '-1': false, '1': false },
      '6': { '2': false },
    });
  });
});
