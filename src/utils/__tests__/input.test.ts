import {
  parseBagRules,
  parseBusSchedule,
  parseCustomsGroupAnswers,
  parseDockingInstructions,
  parseGameBootInstructions,
  parseInput,
  parsePassports,
  parsePasswordConfigs,
  parseSatelliteResponse,
  parseShipNavigationInstructions,
  parseTicketInfo,
} from '../input';

test('Parses a newline delimited array of numbers', () => {
  const input = `142195
  119326
  -57976`;
  expect(parseInput(input)).toStrictEqual([142195, 119326, -57976]);
});

test('Parses a comma delimited array of numbers', () => {
  const input = '1,0,0,3,-1';
  expect(parseInput(input)).toStrictEqual([1, 0, 0, 3, -1]);
});

test('Parses a newline delimited array of strings', () => {
  const input = `YP6)HRL
  5SN)Z3H
  46K)CGP`;
  expect(parseInput(input)).toStrictEqual(['YP6)HRL', '5SN)Z3H', '46K)CGP']);
});

test('Parses a comma delimited array of strings', () => {
  const input = 'R1010,D422,L354,U494';
  expect(parseInput(input)).toStrictEqual(['R1010', 'D422', 'L354', 'U494']);
});

test('Returns an array if no delimiter present', () => {
  const input = '22222';
  expect(parseInput(input)).toStrictEqual([2, 2, 2, 2, 2]);
});

describe('parsePasswordConfigs', () => {
  it('should parse valid configs', () => {
    const input = `1-3 a: abcde
      1-3 b: cdefg
      2-9 c: ccccccccc`;
    expect(parsePasswordConfigs(input)).toEqual([
      {
        start: 1,
        end: 3,
        letter: 'a',
        password: 'abcde',
      },
      {
        start: 1,
        end: 3,
        letter: 'b',
        password: 'cdefg',
      },
      {
        start: 2,
        end: 9,
        letter: 'c',
        password: 'ccccccccc',
      },
    ]);
  });
  it('should throw an error for invalid config', () => {
    const input = `1-3 a:: abcde
      1-3 b: cdefg`;
    expect(() => {
      parsePasswordConfigs(input);
    }).toThrowError('1-3 a:: abcde is not a valid password config');
  });
});

test('parsePassports', () => {
  const input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
  byr:1937 iyr:2017 cid:147 hgt:183cm

  iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
  hcl:#cfa07d byr:1929

  hcl:#ae17e1 iyr:2013
  eyr:2024
  ecl:brn pid:760753108 byr:1931
  hgt:179cm

  hcl:#cfa07d eyr:2025 pid:166559648
  iyr:2011 ecl:brn hgt:59in`;
  expect(parsePassports(input)).toEqual([
    {
      byr: '1937',
      cid: '147',
      ecl: 'gry',
      eyr: '2020',
      hcl: '#fffffd',
      hgt: '183cm',
      iyr: '2017',
      pid: '860033327',
    },
    {
      byr: '1929',
      cid: '350',
      ecl: 'amb',
      eyr: '2023',
      hcl: '#cfa07d',
      iyr: '2013',
      pid: '028048884',
    },
    {
      byr: '1931',
      ecl: 'brn',
      eyr: '2024',
      hcl: '#ae17e1',
      hgt: '179cm',
      iyr: '2013',
      pid: '760753108',
    },
    {
      ecl: 'brn',
      eyr: '2025',
      hcl: '#cfa07d',
      hgt: '59in',
      iyr: '2011',
      pid: '166559648',
    },
  ]);
});

test('parseCustomsGroupAnswers', () => {
  const input = `abc

  a
  b
  c

  ab
  ac`;
  expect(parseCustomsGroupAnswers(input)).toEqual([
    ['abc'],
    ['a', 'b', 'c'],
    ['ab', 'ac'],
  ]);
});

describe('parseBagRules', () => {
  it('should parse the bag rules', () => {
    const input = `dark orange bags contain 3 bright white bags, 4 muted yellow bags.
      bright white bags contain 1 shiny gold bag.
      faded blue bags contain no other bags.
      muted plum bags contain 5 posh silver bags, 3 pale turquoise bags, 3 faded chartreuse bags.`;
    expect(parseBagRules(input)).toEqual({
      brightwhite: {
        adjective: 'bright',
        color: 'white',
        contents: [{ id: 'shinygold', number: 1 }],
        id: 'brightwhite',
      },
      darkorange: {
        adjective: 'dark',
        color: 'orange',
        contents: [
          { id: 'brightwhite', number: 3 },
          { id: 'mutedyellow', number: 4 },
        ],
        id: 'darkorange',
      },
      fadedblue: {
        adjective: 'faded',
        color: 'blue',
        contents: [],
        id: 'fadedblue',
      },
      mutedplum: {
        adjective: 'muted',
        color: 'plum',
        contents: [
          { id: 'poshsilver', number: 5 },
          { id: 'paleturquoise', number: 3 },
          { id: 'fadedchartreuse', number: 3 },
        ],
        id: 'mutedplum',
      },
    });
  });
  it('should throw an error for a bad config', () => {
    const input = `dark orange bags contaaain 3 bright white bags, 4 muted yellow bags.
      bright white bags contain 1 shiny gold bag.`;
    expect(() => {
      parseBagRules(input);
    }).toThrowError(
      'dark orange bags contaaain 3 bright white bags, 4 muted yellow bags.: is not a valid bag config',
    );
  });
  it('should throw an error for a bad inner config', () => {
    const input = `dark orange bags contain 3 bright 7 white bags, 4 muted yellow bags.
      bright white bags contain 1 shiny gold bag.`;
    expect(() => {
      parseBagRules(input);
    }).toThrowError(
      'dark orange bags contain 3 bright 7 white bags, 4 muted yellow bags.: is not a valid bag rule',
    );
  });
});

describe('parseGameBootInstructions', () => {
  it('should parse valid game boot instructions', () => {
    const input = `nop +0
      acc -99
      jmp +4`;
    expect(parseGameBootInstructions(input)).toEqual([
      {
        operation: 'nop',
        argument: 0,
      },
      {
        operation: 'acc',
        argument: -99,
      },
      {
        operation: 'jmp',
        argument: 4,
      },
    ]);
  });
  it('should throw an error for a bad game boot instruction', () => {
    const input = `nop +0
      bad -99
      jmp +4`;
    expect(() => {
      parseGameBootInstructions(input);
    }).toThrowError('bad -99 is not a valid game boot instruction');
  });
});

describe('parseShipNavigationInstructions', () => {
  it('should parse valud ship navigation instructions', () => {
    const inputString = `F10
      N3
      F7
      R90
      F11`;
    expect(parseShipNavigationInstructions(inputString)).toEqual([
      { action: 'F', value: 10 },
      { action: 'N', value: 3 },
      { action: 'F', value: 7 },
      { action: 'R', value: 90 },
      { action: 'F', value: 11 },
    ]);
  });
  it('should throw an error for an invalid instruction', () => {
    expect(() =>
      parseShipNavigationInstructions(`F10
      Na`),
    ).toThrowError('Na is not a valid ship instruction');
  });
  it('should throw an error for an invalid turn angle', () => {
    expect(() =>
      parseShipNavigationInstructions(`F10
      R60`),
    ).toThrowError('R60 is not a valid ship instruction');
  });
});

test('parseBusSchedule', () => {
  const inputString = `939
    7,13,x,x,59,x,31,19`;
  expect(parseBusSchedule(inputString)).toEqual({
    earliestDepart: 939,
    busIds: ['7', '13', 'x', 'x', '59', 'x', '31', '19'],
  });
});

describe('parseDockingInstructions', () => {
  it('should parse correctly', () => {
    const inputString = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`;
    expect(parseDockingInstructions(inputString)).toEqual([
      {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      },
      {
        memAddress: 8,
        memValue: 11,
      },
      {
        memAddress: 7,
        memValue: 101,
      },
      {
        memAddress: 8,
        memValue: 0,
      },
    ]);
  });

  it('should throw error if invalie ', () => {
    const inputString = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[a] = 11
    mem[7] = 101
    mem[8] = 0`;
    expect(() => parseDockingInstructions(inputString)).toThrowError(
      'mem[a] = 11 is not a valid docking instruction',
    );
  });
});

describe('parseTicketInfo', () => {
  it('should parse ticket info', () => {
    const testString = `class: 1-3 or 5-7
      row: 6-11 or 33-44
      seat num: 13-40 or 45-50

      your ticket:
      7,1,14

      nearby tickets:
      7,3,47
      40,4,50
      55,2,20
      38,6,12`;
    expect(parseTicketInfo(testString)).toEqual({
      fields: [
        {
          key: 'class',
          low1: 1,
          high1: 3,
          low2: 5,
          high2: 7,
        },
        {
          key: 'row',
          low1: 6,
          high1: 11,
          low2: 33,
          high2: 44,
        },
        {
          key: 'seat num',
          low1: 13,
          high1: 40,
          low2: 45,
          high2: 50,
        },
      ],
      myTicket: [7, 1, 14],
      nearbyTickets: [
        [7, 3, 47],
        [40, 4, 50],
        [55, 2, 20],
        [38, 6, 12],
      ],
    });
  });
  it('should throw error if invalid field', () => {
    const testString = `class: 1-3 or 5-7
      row: 6-11 or3-44
      seat num: 13-40 or 45-50

      your ticket:
      7,1,14

      nearby tickets:
      7,3,47
      40,4,50
      55,2,20
      38,6,12`;
    expect(() => parseTicketInfo(testString)).toThrowError(
      'row: 6-11 or3-44 is not a valid field info',
    );
  });
});

describe('parseSatelliteResponse', () => {
  it('should parse satellite response', () => {
    const testString = `0: 4 1 5
    1: 1 2 | 8 9
    2: 12
    5: "b"

    aaabbb
    aaaabbb`;
    expect(parseSatelliteResponse(testString)).toEqual({
      rules: {
        0: {
          pattern: undefined,
          subRules: [[4, 1, 5]],
        },
        1: {
          pattern: undefined,
          subRules: [
            [1, 2],
            [8, 9],
          ],
        },
        2: {
          pattern: undefined,
          subRules: [[12]],
        },
        5: {
          pattern: 'b',
          subRules: undefined,
        },
      },
      messages: ['aaabbb', 'aaaabbb'],
    });
  });
  it('should throw error if invalid rule in satellite response', () => {
    const testString = `0: 4 1 5
    1: 1 2 | a8 9
    2: 12
    5: "b"

    aaabbb
    aaaabbb`;
    expect(() => parseSatelliteResponse(testString)).toThrowError(
      '1: 1 2 | a8 9 is not a valid satellite rule',
    );
  });
});
