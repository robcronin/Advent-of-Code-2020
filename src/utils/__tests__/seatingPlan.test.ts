import { parseInput } from '../input';
import {
  countSeatTypes,
  getClosestNeighbours,
  getDimensions,
  getFirstNeighbours,
  getNextChair,
  runIteration,
  runUntilStable,
} from '../seatingPlan';

const testString = `LL..
..LL
L.LL
L..L
..L.`;
const seatingPlan = parseInput(testString) as string[];

test('getDimensions', () => {
  expect(getDimensions(seatingPlan)).toEqual({ rows: 5, cols: 4 });
});

describe('getClosestNeighbours', () => {
  it('should work at the top left corner', () => {
    expect(getClosestNeighbours(seatingPlan, 0, 0)).toEqual({
      L: 1,
      '.': 2,
      '#': 0,
    });
  });
  it('should work at the top right corner', () => {
    expect(getClosestNeighbours(seatingPlan, 0, 3)).toEqual({
      L: 2,
      '.': 1,
      '#': 0,
    });
  });
  it('should work at the bottom left corner', () => {
    expect(getClosestNeighbours(seatingPlan, 4, 0)).toEqual({
      L: 1,
      '.': 2,
      '#': 0,
    });
  });
  it('should work at the bottom right corner', () => {
    expect(getClosestNeighbours(seatingPlan, 4, 3)).toEqual({
      L: 2,
      '.': 1,
      '#': 0,
    });
  });
  it('should work on the top row', () => {
    expect(getClosestNeighbours(seatingPlan, 0, 1)).toEqual({
      L: 2,
      '.': 3,
      '#': 0,
    });
  });
  it('should work on the bottom row', () => {
    expect(getClosestNeighbours(seatingPlan, 4, 2)).toEqual({
      L: 1,
      '.': 4,
      '#': 0,
    });
  });
  it('should work on the first column', () => {
    expect(getClosestNeighbours(seatingPlan, 2, 0)).toEqual({
      L: 1,
      '.': 4,
      '#': 0,
    });
  });
  it('should work on the last column', () => {
    expect(getClosestNeighbours(seatingPlan, 3, 3)).toEqual({
      L: 3,
      '.': 2,
      '#': 0,
    });
  });
  it('should work in the middle', () => {
    expect(getClosestNeighbours(seatingPlan, 3, 1)).toEqual({
      L: 4,
      '.': 4,
      '#': 0,
    });
  });
});

describe('getNextChair', () => {
  it('should work going left', () => {
    expect(getNextChair(seatingPlan, 2, 1, 0, -1)).toEqual('L');
  });
  it('should work going right', () => {
    expect(getNextChair(seatingPlan, 2, 1, 0, 1)).toEqual('L');
  });
  it('should work going up', () => {
    expect(getNextChair(seatingPlan, 2, 1, -1, 0)).toEqual('L');
  });
  it('should work going down', () => {
    expect(getNextChair(seatingPlan, 2, 1, 1, 0)).toEqual('.');
  });
  it('should work going up left', () => {
    expect(getNextChair(seatingPlan, 2, 1, -1, -1)).toEqual('.');
  });
  it('should work going up right', () => {
    expect(getNextChair(seatingPlan, 2, 1, -1, 1)).toEqual('L');
  });
  it('should work going down left', () => {
    expect(getNextChair(seatingPlan, 2, 1, 1, -1)).toEqual('L');
  });
  it('should work going down right', () => {
    expect(getNextChair(seatingPlan, 2, 1, 1, 1)).toEqual('.');
  });
  it('should work at edge', () => {
    expect(getNextChair(seatingPlan, 0, 0, -1, 1)).toEqual(undefined);
  });
});

describe('getFirstNeighbours', () => {
  it('should work at the top left corner', () => {
    expect(getFirstNeighbours(seatingPlan, 0, 0)).toEqual({
      L: 3,
      '.': 0,
      '#': 0,
    });
  });
  it('should work at the top right corner', () => {
    expect(getFirstNeighbours(seatingPlan, 0, 3)).toEqual({
      L: 3,
      '.': 0,
      '#': 0,
    });
  });
  it('should work at the bottom left corner', () => {
    expect(getFirstNeighbours(seatingPlan, 4, 0)).toEqual({
      L: 3,
      '.': 0,
      '#': 0,
    });
  });
  it('should work at the bottom right corner', () => {
    expect(getFirstNeighbours(seatingPlan, 4, 3)).toEqual({
      L: 2,
      '.': 1,
      '#': 0,
    });
  });
  it('should work on the top row', () => {
    expect(getFirstNeighbours(seatingPlan, 0, 1)).toEqual({
      L: 2,
      '.': 3,
      '#': 0,
    });
  });
  it('should work on the bottom row', () => {
    expect(getFirstNeighbours(seatingPlan, 4, 2)).toEqual({
      L: 3,
      '.': 2,
      '#': 0,
    });
  });
  it('should work on the first column', () => {
    expect(getFirstNeighbours(seatingPlan, 2, 0)).toEqual({
      L: 4,
      '.': 1,
      '#': 0,
    });
  });
  it('should work on the last column', () => {
    expect(getFirstNeighbours(seatingPlan, 3, 3)).toEqual({
      L: 4,
      '.': 1,
      '#': 0,
    });
  });
  it('should work in the middle', () => {
    expect(getFirstNeighbours(seatingPlan, 3, 1)).toEqual({
      L: 6,
      '.': 2,
      '#': 0,
    });
  });
});

describe('runIteration', () => {
  it('should run new grid with closest for 4 threshold', () => {
    expect(runIteration(seatingPlan, 4, 'closest')).toEqual({
      newSeatingPlan: ['##..', '..##', '#.##', '#..#', '..#.'],
      numChanges: 10,
    });
  });
  it('should run existing grid with closest for 4 threshold', () => {
    const { newSeatingPlan } = runIteration(seatingPlan, 4, 'closest');
    expect(runIteration(newSeatingPlan, 4, 'closest')).toEqual({
      newSeatingPlan: ['##..', '..L#', '#.LL', '#..#', '..#.'],
      numChanges: 3,
    });
  });
  it('should run new grid with first for 5 threshold', () => {
    expect(runIteration(seatingPlan, 5, 'first')).toEqual({
      newSeatingPlan: ['##..', '..##', '#.##', '#..#', '..#.'],
      numChanges: 10,
    });
  });
  it('should run existing grid with first for 5 threshold', () => {
    const { newSeatingPlan } = runIteration(seatingPlan, 5, 'first');
    expect(runIteration(newSeatingPlan, 5, 'first')).toEqual({
      newSeatingPlan: ['##..', '..L#', '#.L#', '#..#', '..#.'],
      numChanges: 2,
    });
  });
});

test('countSeatTypes', () => {
  expect(countSeatTypes(seatingPlan)).toEqual({ '#': 0, '.': 10, L: 10 });
});

describe('runUntilStable', () => {
  it('should run until stable for closest with 4 threshold', () => {
    expect(runUntilStable(seatingPlan, 4, 'closest')).toEqual([
      '##..',
      '..L#',
      '#.LL',
      '#..#',
      '..#.',
    ]);
  });
  it('should run until stable for first with 5 threshold', () => {
    expect(runUntilStable(seatingPlan, 5, 'first')).toEqual([
      '##..',
      '..L#',
      '#.L#',
      '#..#',
      '..#.',
    ]);
  });
});
