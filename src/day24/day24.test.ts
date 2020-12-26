import { parseTileDirections } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day24, day24part2 } from './day24';
import { data } from './day24.data';

const testString = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;
const testData = parseTileDirections(testString);

describe('day 24', () => {
  it('test cases', () => {
    expect(day24(testData)).toBe(10);
  });

  it('answer', () => {
    const answer = day24(data);
    logAnswer(answer, 24, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(375);
  });
});

describe('day 24 part 2', () => {
  it('test cases', () => {
    expect(day24part2(testData)).toBe(2208);
  });

  it('answer', () => {
    const answer = day24part2(data);
    logAnswer(answer, 24, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(3937);
  });
});
