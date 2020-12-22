import { parseSatelliteImages, SatelliteRule } from '../input';
import {
  addImageToFullGrid,
  countHashes,
  fillInImageGrid,
  findMatchingImageForBorder,
  findSeaMonsters,
  flipImageHorizontally,
  flipImageVertically,
  getAllBorders,
  getEdge,
  getImageIdsByNumEdges,
  getNextBottomImage,
  getNextRightImage,
  getRotatedFirstCorner,
  getValidPatternsForRule,
  removeSeaMonsters,
  rotateImage90,
  rotateImage90Times,
} from '../satellite';

const rules: Record<number, SatelliteRule> = {
  0: {
    pattern: undefined,
    subRules: [[4, 1, 5]],
  },
  1: {
    pattern: undefined,
    subRules: [
      [4, 5],
      [5, 4],
    ],
  },
  2: {
    pattern: undefined,
    subRules: [[4, 5, 4, 5, 4]],
  },
  3: {
    pattern: undefined,
    subRules: [[4, 5]],
  },
  4: {
    pattern: 'a',
    subRules: undefined,
  },
  5: {
    pattern: 'b',
    subRules: undefined,
  },
};

const rules2: Record<number, SatelliteRule> = {
  '0': { subRules: [[4, 1, 5]] },
  '1': {
    subRules: [
      [2, 3],
      [3, 2],
    ],
  },
  '2': {
    subRules: [
      [4, 4],
      [5, 5],
    ],
  },
  '3': {
    subRules: [
      [4, 5],
      [5, 4],
    ],
  },
  '4': { pattern: 'a' },
  '5': { pattern: 'b' },
};

const satelliteImagesString = `Tile 2311:
    ..##.#..#.
    ##..#.....
    #...##..#.
    ####.#...#
    ##.##.###.
    ##...#.###
    .#.#.#..##
    ..#....#..
    ###...#.#.
    ..###..###

    Tile 1951:
    #...##.#..
    ..#.#..#.#
    .###....#.
    ###.##.##.
    .###.#####
    .##.#....#
    #...######
    .....#..##
    #.####...#
    #.##...##.

    Tile 1171:
    ####...##.
    #..##.#..#
    ##.#..#.#.
    .###.####.
    ..###.####
    .##....##.
    .#...####.
    #.##.####.
    ####..#...
    .....##...

    Tile 1427:
    ###.##.#..
    .#..#.##..
    .#.##.#..#
    #.#.#.##.#
    ....#...##
    ...##..##.
    ...#.#####
    .#.####.#.
    ..#..###.#
    ..##.#..#.

    Tile 1489:
    ##.#.#....
    ..##...#..
    .##..##...
    ..#...#...
    #####...#.
    #..#.#.#.#
    ...#.#.#..
    ##.#...##.
    ..##.##.##
    ###.##.#..

    Tile 2473:
    #....####.
    #..#.##...
    #.##..#...
    ######.#.#
    .#...#.#.#
    .#########
    .###.#..#.
    ########.#
    ##...##.#.
    ..###.#.#.

    Tile 2971:
    ..#.#....#
    #...###...
    #.#.###...
    ##.##..#..
    .#####..##
    .#..####.#
    #..#.#..#.
    ..####.###
    ..#.#.###.
    ...#.#.#.#

    Tile 2729:
    ...#.#.#.#
    ####.#....
    ..#.#.....
    ....#..#.#
    .##..##.#.
    .#.####...
    ####.#.#..
    ##.####...
    ##..#.##..
    #.##...##.

    Tile 3079:
    #.#.#####.
    .#..######
    ..#.......
    ######....
    ####.#..#.
    .#...#.##.
    #.#####.##
    ..#.###...
    ..#.......
    ..#.###...`;
const satelliteImages = parseSatelliteImages(satelliteImagesString);

describe('getValidPatternsForRule', () => {
  it('should work at last level', () => {
    expect(getValidPatternsForRule(5, rules)).toEqual(['b']);
  });
  it('should work for two simple rules', () => {
    expect(getValidPatternsForRule(3, rules)).toEqual(['ab']);
  });
  it('should work for five simple rules', () => {
    expect(getValidPatternsForRule(2, rules)).toEqual(['ababa']);
  });
  it('should work for a pair of two simple rules', () => {
    expect(getValidPatternsForRule(1, rules)).toEqual(['ab', 'ba']);
  });
  it('should work on the sample input', () => {
    expect(getValidPatternsForRule(0, rules2)).toEqual([
      'aaaabb',
      'aaabab',
      'abbabb',
      'abbbab',
      'aabaab',
      'aabbbb',
      'abaaab',
      'ababbb',
    ]);
  });
});

describe('getImageIdsByNumEdges', () => {
  it('should return the ids by num edges', () => {
    expect(getImageIdsByNumEdges(satelliteImages, 2)).toEqual([
      1171,
      1951,
      2971,
      3079,
    ]);
  });
});

describe('rotateImage90', () => {
  it('should rotate square image 90', () => {
    const image = ['123', '456', '789'];
    expect(rotateImage90(image)).toEqual(['741', '852', '963']);
  });
  it('should rotate non square image 90', () => {
    const image = ['123', '456'];
    expect(rotateImage90(image)).toEqual(['41', '52', '63']);
  });
});

describe('rotateImage90Times', () => {
  it('should rotate square image 90 twice', () => {
    const image = ['123', '456', '789'];
    expect(rotateImage90Times(image, 2)).toEqual(['987', '654', '321']);
  });
  it('should rotate non square image 90 twice', () => {
    const image = ['123', '456'];
    expect(rotateImage90Times(image, 2)).toEqual(['654', '321']);
  });
});

describe('flipImageHorizontally', () => {
  it('should flip square image horizontally', () => {
    const image = ['123', '456', '789'];
    expect(flipImageHorizontally(image)).toEqual(['789', '456', '123']);
  });
  it('should flip non square image horizontally', () => {
    const image = ['123', '456'];
    expect(flipImageHorizontally(image)).toEqual(['456', '123']);
  });
});

describe('flipImageVertically', () => {
  it('should flip square image vertically', () => {
    const image = ['123', '456', '789'];
    expect(flipImageVertically(image)).toEqual(['321', '654', '987']);
  });
  it('should flip non square image vertically', () => {
    const image = ['123', '456'];
    expect(flipImageVertically(image)).toEqual(['321', '654']);
  });
});

describe('addImageToFullGrid', () => {
  it('add image to full grid on the right minus the border', () => {
    const fullGrid = ['12', '34'];
    const image = ['1234', '5678', '9012', '3456'];

    expect(addImageToFullGrid(fullGrid, image, true)).toEqual(['1267', '3401']);
  });
  it('add image to full grid on the bottom minus the border', () => {
    const fullGrid = ['12', '34'];
    const image = ['1234', '5678', '9012', '3456'];

    expect(addImageToFullGrid(fullGrid, image, false)).toEqual([
      '12',
      '34',
      '67',
      '01',
    ]);
  });
});

describe('getEdge', () => {
  const image = ['1234', '5678', '9012', '3456'];
  it('should return right edge', () => {
    expect(getEdge(image, true)).toEqual('4826');
  });
  it('should return bottom edge', () => {
    expect(getEdge(image, false)).toEqual('3456');
  });
});

describe('findMatchingImageForBorder', () => {
  it('should return the matching id', () => {
    expect(
      findMatchingImageForBorder(1427, '..##.#..#.', satelliteImages),
    ).toEqual({
      id: 2311,
      borderIndex: 0,
      flip: false,
    });
  });
});

describe('getRotatedFirstCorner', () => {
  it('should return the rotated first corner', () => {
    expect(
      getRotatedFirstCorner([3079, 1951, 2971, 1171], satelliteImages),
    ).toEqual({
      borders: ['.#....#...', '...###.#..', '#..##.#...', '.#####.#.#'],
      bottom: '#..##.#...',
      id: 3079,
      image: [
        '.#....#...',
        '##..###...',
        '##...#....',
        '##....##.#',
        '##.#####.#',
        '##.#..##.#',
        '...##.#...',
        '#.###.####',
        '.#.###....',
        '#..##.#...',
      ],
      left: '.#####.#.#',
      right: '...###.#..',
      top: '.#....#...',
    });
  });
});

describe('getAllBorders', () => {
  it('should return all the borders', () => {
    expect(getAllBorders(satelliteImages[1951].image)).toEqual({
      borders: ['#...##.#..', '.#..#####.', '#.##...##.', '#..#..#.##'],
      bottom: '#.##...##.',
      left: '#..#..#.##',
      right: '.#..#####.',
      top: '#...##.#..',
    });
  });
});

describe('getNextRightImage', () => {
  it('should get next right image', () => {
    expect(getNextRightImage(satelliteImages[1951], satelliteImages)).toEqual({
      borders: ['..###..###', '#..##.#...', '..##.#..#.', '.#..#####.'],
      bottom: '..##.#..#.',
      id: 2311,
      image: [
        '..###..###',
        '###...#.#.',
        '..#....#..',
        '.#.#.#..##',
        '##...#.###',
        '##.##.###.',
        '####.#...#',
        '#...##..#.',
        '##..#.....',
        '..##.#..#.',
      ],
      left: '.#..#####.',
      right: '#..##.#...',
      top: '..###..###',
    });
  });
});

describe('getNextBottomImage', () => {
  it('should get next right image', () => {
    expect(getNextBottomImage(satelliteImages[1951], satelliteImages)).toEqual({
      borders: ['#.##...##.', '......#..#', '...#.#.#.#', '####....#.'],
      bottom: '...#.#.#.#',
      id: 2729,
      image: [
        '#.##...##.',
        '##..#.##..',
        '##.####...',
        '####.#.#..',
        '.#.####...',
        '.##..##.#.',
        '....#..#.#',
        '..#.#.....',
        '####.#....',
        '...#.#.#.#',
      ],
      left: '####....#.',
      right: '......#..#',
      top: '#.##...##.',
    });
  });
});

describe('fillInImageGrid', () => {
  it('should fill in the grid', () => {
    expect(fillInImageGrid(satelliteImages)).toEqual([
      '#.##.##...#.##....###..#',
      '##.###...##..#.....#...#',
      '##..#########.#..##....#',
      '....#..##...#.#..#####.#',
      '.##..#..########.##..#.#',
      '###.#######.#..#..#.##..',
      '.#####..#######.###.###.',
      '.######.#...##.#...###.#',
      '...#..##...####..#.###.#',
      '#...###.#.#.##.#...##.#.',
      '.##....####..###...#...#',
      '.#..##.#.....###.##.##..',
      '...#....#####.#.##.#....',
      '#..#####.#..###...##.#..',
      '####...#..#....#..#...##',
      '.#.#..#.##....#.#.####.#',
      '...#.###...#.....##.###.',
      '..#.#.##..#..#.#..#.##.#',
      '##..#..#...##.##..#.#...',
      '##.####.#..####.###.##..',
      '#####.##.##.#.###.##.#.#',
      '..##.##.#...###.#...#.#.',
      '.#.#..####.#.#..#..#####',
      '..###...#..#####...####.',
    ]);
  });
});

describe('findSeaMonsters', () => {
  it('should find the sea monsters', () => {
    expect(findSeaMonsters(fillInImageGrid(satelliteImages))).toEqual({
      seaMonsterOrientedGrid: [
        '.####...#####..#...###..',
        '#####..#..#.#.####..#.#.',
        '.#.#...#.###...#.##.##..',
        '#.#.##.###.#.##.##.#####',
        '..##.###.####..#.####.##',
        '...#.#..##.##...#..#..##',
        '#.##.#..#.#..#..##.#.#..',
        '.###.##.....#...###.#...',
        '#.####.#.#....##.#..#.#.',
        '##...#..#....#..#...####',
        '..#.##...###..#.#####..#',
        '....#.##.#.#####....#...',
        '..##.##.###.....#.##..#.',
        '#...#...###..####....##.',
        '.#.##...#.##.#.#.###...#',
        '#.###.#..####...##..#...',
        '#.###...#.##...#.######.',
        '.###.###.#######..#####.',
        '..##.#..#..#.#######.###',
        '#.#..##.########..#..##.',
        '#.#####..#.#...##..#....',
        '#....##..#.#########..##',
        '#...#.....#..##...###.##',
        '#..###....##.#...##.##.#',
      ],
      seaMonsters: [
        [2, 2],
        [16, 1],
      ],
    });
  });
});

describe('removeSeaMonsters', () => {
  it('should remove the sea monsters', () => {
    const { seaMonsterOrientedGrid, seaMonsters } = findSeaMonsters(
      fillInImageGrid(satelliteImages),
    );

    expect(removeSeaMonsters(seaMonsterOrientedGrid, seaMonsters)).toEqual([
      '.####...#####..#...###..',
      '#####..#..#.#.####..#.#.',
      '.#.#...#.###...#.##.O#..',
      '#.O.##.OO#.#.OO.##.OOO##',
      '..#O.#O#.O##O..O.#O##.##',
      '...#.#..##.##...#..#..##',
      '#.##.#..#.#..#..##.#.#..',
      '.###.##.....#...###.#...',
      '#.####.#.#....##.#..#.#.',
      '##...#..#....#..#...####',
      '..#.##...###..#.#####..#',
      '....#.##.#.#####....#...',
      '..##.##.###.....#.##..#.',
      '#...#...###..####....##.',
      '.#.##...#.##.#.#.###...#',
      '#.###.#..####...##..#...',
      '#.###...#.##...#.##O###.',
      '.O##.#OO.###OO##..OOO##.',
      '..O#.O..O..O.#O##O##.###',
      '#.#..##.########..#..##.',
      '#.#####..#.#...##..#....',
      '#....##..#.#########..##',
      '#...#.....#..##...###.##',
      '#..###....##.#...##.##.#',
    ]);
  });
});

describe('removeSeaMonsters', () => {
  it('should remove the sea monsters', () => {
    const filledInGrid = fillInImageGrid(satelliteImages);
    expect(countHashes(filledInGrid)).toEqual(303);
  });
});
