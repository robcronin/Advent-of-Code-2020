export interface PasswordConfig {
  start: number;
  end: number;
  letter: string;
  password: string;
}

export interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

export type CustomsGroupAnswers = string[][];

export interface BagContents {
  id: string;
  number: number;
}
export interface BagConfig {
  adjective: string;
  color: string;
  id: string;
  contents: BagContents[];
}

export type GameBootOperation = 'nop' | 'acc' | 'jmp';
export interface GameBootInstruction {
  operation: GameBootOperation;
  argument: number;
}

export type ShipNavigationAction = 'N' | 'S' | 'E' | 'W' | 'R' | 'L' | 'F';
export interface ShipNavigationInstruction {
  action: ShipNavigationAction;
  value: number;
}

const getDelimiter = (input: string) => {
  if (input.includes(',')) {
    return ',';
  }
  if (input.includes('\n')) {
    return '\n';
  }
  return '';
};

const mapToNumberIfNecessary = (input: string[]) => {
  if (input.every((value) => !isNaN(Number(value)))) {
    return input.map((element) => Number(element));
  }
  return input;
};

const parseLines = (input: string, delimiter?: string) => {
  const inputArray = input.split(delimiter || getDelimiter(input));
  return inputArray.map((element) => element.trim());
};

export const parseInput = (input: string) => {
  const parsed = parseLines(input);
  return mapToNumberIfNecessary(parsed);
};

export const parsePasswordConfigs = (input: string): PasswordConfig[] => {
  const parsed = parseLines(input);
  return parsed.map((element) => {
    const groups = element.match(
      new RegExp('^([0-9]+)-([0-9]+) ([A-Za-z]): ([A-Za-z]+)$'),
    );
    if (!groups) throw new Error(`${element} is not a valid password config`);
    const [_, start, end, letter, password] = groups;
    return {
      start: +start,
      end: +end,
      letter,
      password,
    };
  });
};

export const parsePassports = (input: string): Passport[] => {
  const parsed = parseLines(input, '\n\n');
  return parsed.map((element) => {
    const passportRows = parseLines(element, '\n');
    const keyValues = passportRows.reduce(
      (acc: string[], row) => [...acc, ...row.split(' ')],
      [],
    );
    return keyValues.reduce((acc, keyValue) => {
      const [key, value] = keyValue.split(':');
      return {
        ...acc,
        [key]: value,
      };
    }, {});
  });
};

export const parseCustomsGroupAnswers = (
  input: string,
): CustomsGroupAnswers => {
  const parsed = parseLines(input, '\n\n');
  return parsed.map((element) => parseLines(element, '\n'));
};

export const parseBagRules = (input: string): Record<string, BagConfig> => {
  const parsed = parseLines(input, '\n');
  return parsed.reduce((acc, element) => {
    const groups = element.match(
      new RegExp('^([a-z]+) ([a-z]+) bags contain ((no other bags\\.)|(.*))$'),
    );
    if (!groups) throw new Error(`${element}: is not a valid bag config`);
    const [_, adjective, color, _2, isNone, contentRulesString] = groups;

    const contents: BagContents[] = [];
    if (!isNone) {
      const contentRules = parseLines(contentRulesString, ',');
      contentRules.forEach((rule) => {
        const ruleGroups = rule.match(
          new RegExp('^([0-9]+) ([a-z]+) ([a-z]+) .*'),
        );
        if (!ruleGroups) throw new Error(`${element}: is not a valid bag rule`);
        const [_, number, containAdjective, containColor] = ruleGroups;
        contents.push({
          id: `${containAdjective}${containColor}`,
          number: +number,
        });
      });
    }
    const id = `${adjective}${color}`;
    return {
      ...acc,
      [id]: {
        adjective,
        color,
        id,
        contents,
      },
    };
  }, {});
};

export const parseGameBootInstructions = (
  input: string,
): GameBootInstruction[] => {
  const parsed = parseLines(input);
  return parsed.map((element) => {
    const groups = element.match(new RegExp('^(nop|acc|jmp) ((\\+|-)[0-9]+)$'));
    if (!groups)
      throw new Error(`${element} is not a valid game boot instruction`);
    const [_, operation, argument] = groups;
    return {
      operation: operation as GameBootOperation,
      argument: +argument,
    };
  });
};

export const parseShipNavigationInstructions = (
  input: string,
): ShipNavigationInstruction[] => {
  const parsed = parseLines(input);
  return parsed.map((element) => {
    const groups = element.match(
      new RegExp('^((N|S|E|W|F)([0-9]+))|((L|R)(90|180|270))$'),
    );
    if (!groups) throw new Error(`${element} is not a valid ship instruction`);
    const [_, _movement, direction, value, _turn, leftOrRight, angle] = groups;
    return {
      action: (direction || leftOrRight) as ShipNavigationAction,
      value: +value || +angle,
    };
  });
};
