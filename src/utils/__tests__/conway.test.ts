import {
  ConwayGrid,
  countActiveCubes,
  duplicateConwayGrid,
  getGridState,
  getMinMaxGrid,
  getMinMaxKeys,
  getNumActiveNeighbours,
  runConwayIteration,
  runNumConwayIterations,
  setGridFromStartingState,
  setGridStateInPlace,
} from '../conway';

const gridToCopy: ConwayGrid = {
  1: {
    1: {
      1: { 0: '#' },
      2: { 0: '.' },
    },
    2: {
      3: { 0: '#' },
    },
  },
  2: {
    3: {
      4: { 0: '#' },
    },
  },
};

let grid: ConwayGrid;
beforeEach(() => {
  grid = duplicateConwayGrid(gridToCopy);
});

describe('getGridState', () => {
  it('should get set value', () => {
    expect(getGridState(grid, 1, 2, 3, 0)).toBe('#');
  });
  it('should get default if z not set', () => {
    expect(getGridState(grid, 1, 2, 4, 0)).toBe('.');
  });
  it('should get default if y not set', () => {
    expect(getGridState(grid, 1, 4, 4, 0)).toBe('.');
  });
  it('should get default if x not set', () => {
    expect(getGridState(grid, 4, 4, 4, 0)).toBe('.');
  });
});

describe('setGridStateInPlace', () => {
  it('should overwrite existing state', () => {
    expect(getGridState(grid, 1, 2, 3, 0)).toBe('#');
    setGridStateInPlace(grid, '.', 1, 2, 3, 0);
    expect(getGridState(grid, 1, 2, 3, 0)).toBe('.');
  });
  it('should set new state with no z', () => {
    expect(getGridState(grid, 1, 2, 4, 0)).toBe('.');
    setGridStateInPlace(grid, '#', 1, 2, 4, 0);
    expect(getGridState(grid, 1, 2, 4, 0)).toBe('#');
  });
  it('should set new state with no y', () => {
    expect(getGridState(grid, 1, 4, 4, 0)).toBe('.');
    setGridStateInPlace(grid, '#', 1, 4, 4, 0);
    expect(getGridState(grid, 1, 4, 4, 0)).toBe('#');
  });
  it('should set new state with no x', () => {
    expect(getGridState(grid, 4, 4, 4, 0)).toBe('.');
    setGridStateInPlace(grid, '#', 4, 4, 4, 0);
    expect(getGridState(grid, 4, 4, 4, 0)).toBe('#');
  });
});

describe('setGridFromStartingState', () => {
  it('should set the initial state', () => {
    const startingState = ['.#.', '..#', '###'];
    expect(setGridFromStartingState(startingState)).toEqual({
      0: {
        0: {
          0: { 0: '.' },
        },
        '-1': {
          0: { 0: '.' },
        },
        '-2': {
          0: { 0: '#' },
        },
      },
      1: {
        0: {
          0: { 0: '#' },
        },
        '-1': {
          0: { 0: '.' },
        },
        '-2': {
          0: { 0: '#' },
        },
      },
      2: {
        0: {
          0: { 0: '.' },
        },
        '-1': {
          0: { 0: '#' },
        },
        '-2': {
          0: { 0: '#' },
        },
      },
    });
  });
});

describe('duplicateConwayGrid', () => {
  it('should deep copy a conway grid', () => {
    const deepcopy = duplicateConwayGrid(grid);
    setGridStateInPlace(grid, '#', 10, 10, 10, 0);
    expect(getGridState(grid, 10, 10, 10, 0)).toBe('#');
    expect(getGridState(deepcopy, 10, 10, 10, 0)).toBe('.');
  });
});

describe('getMinMaxKeys', () => {
  it('should return the min max keys of a number keyed object', () => {
    expect(getMinMaxKeys({ 1: 0, 2: 2, '-1': 10, '-2': 1 })).toEqual([-2, 2]);
  });
  it('should return 0 as min max if undefined', () => {
    expect(getMinMaxKeys(undefined)).toEqual([0, 0]);
  });
});

describe('getMinMaxGrid', () => {
  it('should return the min max keys of a grid', () => {
    expect(getMinMaxGrid(grid)).toEqual({
      maxX: 2,
      maxY: 3,
      maxZ: 4,
      minX: 1,
      minY: 0,
      minZ: 0,
      minW: 0,
      maxW: 0,
    });
  });
});

describe('getNumActiveNeighbours', () => {
  it('should return the number of active neighbours', () => {
    const startingState = ['.#.', '..#', '###'];
    const grid = setGridFromStartingState(startingState);
    expect(getNumActiveNeighbours(grid, 1, -1, 0, 0)).toBe(5);
  });
});

describe('countActiveCubes', () => {
  it('should return the number of active cubes', () => {
    const startingState = ['.#.', '#.#', '###'];
    const grid = setGridFromStartingState(startingState);
    expect(countActiveCubes(grid)).toBe(6);
  });
});

describe('runConwayIteration', () => {
  it('should run the conway iteration', () => {
    const startingState = ['.#.', '..#', '###'];
    const grid = setGridFromStartingState(startingState);
    const newGrid = runConwayIteration(grid, false);
    expect(newGrid).toEqual({
      '0': {
        '-1': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
      },
      '1': {
        '-3': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
        '-2': { '0': { '0': '#' } },
      },
      '2': {
        '-2': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
        '-1': { '0': { '0': '#' } },
      },
    });
  });
  it('should run the conway iteration in hyper mode', () => {
    const startingState = ['.#.', '..#', '###'];
    const grid = setGridFromStartingState(startingState);
    const newGrid = runConwayIteration(grid, true);
    expect(newGrid).toEqual({
      '0': {
        '-1': {
          '0': { '0': '#', '1': '#', '-1': '#' },
          '1': { '0': '#', '1': '#', '-1': '#' },
          '-1': { '0': '#', '1': '#', '-1': '#' },
        },
      },
      '1': {
        '-3': {
          '0': { '0': '#', '1': '#', '-1': '#' },
          '1': { '0': '#', '1': '#', '-1': '#' },
          '-1': { '0': '#', '1': '#', '-1': '#' },
        },
        '-2': { '0': { '0': '#' } },
      },
      '2': {
        '-2': {
          '0': { '0': '#', '1': '#', '-1': '#' },
          '1': { '0': '#', '1': '#', '-1': '#' },
          '-1': { '0': '#', '1': '#', '-1': '#' },
        },
        '-1': { '0': { '0': '#' } },
      },
    });
  });
});

describe('runNumConwayIterations', () => {
  it('should run one conway iteration', () => {
    const startingState = ['.#.', '..#', '###'];
    const grid = setGridFromStartingState(startingState);
    const newGrid = runNumConwayIterations(grid, 1, false);
    expect(newGrid).toEqual({
      '0': {
        '-1': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
      },
      '1': {
        '-3': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
        '-2': { '0': { '0': '#' } },
      },
      '2': {
        '-2': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
        '-1': { '0': { '0': '#' } },
      },
    });
  });
  it('should run two conway iterations', () => {
    const startingState = ['.#.', '..#', '###'];
    const grid = setGridFromStartingState(startingState);
    const newGrid = runNumConwayIterations(grid, 2, false);
    expect(newGrid).toEqual({
      '0': {
        '0': { '0': { '0': '#' } },
        '-4': { '0': { '0': '#' } },
        '-3': { '1': { '0': '#' }, '-1': { '0': '#' } },
        '-1': { '0': { '0': '#' }, '1': { '0': '#' }, '-1': { '0': '#' } },
      },
      '1': {
        '0': { '1': { '0': '#' }, '-1': { '0': '#' } },
        '-4': { '0': { '0': '#' } },
        '-2': { '2': { '0': '#' }, '-2': { '0': '#' } },
      },
      '2': { '-4': { '0': { '0': '#' } } },
      '3': {
        '-3': { '0': { '0': '#' } },
        '-2': { '1': { '0': '#' }, '-1': { '0': '#' } },
        '-1': { '1': { '0': '#' }, '-1': { '0': '#' } },
      },
      '-1': {
        '0': { '0': { '0': '#' } },
        '-2': { '0': { '0': '#' } },
        '-1': { '0': { '0': '#' } },
      },
    });
  });
});
