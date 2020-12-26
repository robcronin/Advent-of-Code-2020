import { parseSatelliteImages } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day20, day20part2 } from './day20';
import { data } from './day20.data';

const testString = `Tile 2311:
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
const testData = parseSatelliteImages(testString);

describe('day 20', () => {
  it('test cases', () => {
    expect(day20(testData)).toBe(20899048083289);
  });

  it('answer', () => {
    const answer = day20(data);
    logAnswer(answer, 20, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(111936085519519);
  });
});

describe('day 20 part 2', () => {
  it('test cases', () => {
    expect(day20part2(testData)).toBe(273);
  });

  it('answer', () => {
    const answer = day20part2(data);
    logAnswer(answer, 20, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(1792);
  });
});