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

export interface BusSchedule {
  earliestDepart: number;
  busIds: string[];
}

export type DockingInstruction =
  | {
      mask: string;
      memAddress: undefined;
      memValue: undefined;
    }
  | {
      mask: undefined;
      memAddress: number;
      memValue: number;
    };

export interface TicketFieldInfo {
  key: string;
  low1: number;
  high1: number;
  low2: number;
  high2: number;
}

export type Ticket = number[];
export interface TicketInfo {
  fields: TicketFieldInfo[];
  myTicket: Ticket;
  nearbyTickets: Ticket[];
}

export type SatelliteRule =
  | { pattern: string; subRules: undefined }
  | { pattern: undefined; subRules: number[][] };
export interface SatelliteResponse {
  rules: Record<number, SatelliteRule>;
  messages: string[];
}

export interface SatelliteImage {
  id: number;
  image: string[];
  borders: [string, string, string, string];
  top: string;
  right: string;
  bottom: string;
  left: string;
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

export const parseBusSchedule = (input: string): BusSchedule => {
  const parsed = parseLines(input, '\n');
  const earliestDepart = +parsed[0];
  const busIdInput = parsed[1];
  const parsedBusIds = parseLines(busIdInput, ',');
  return { earliestDepart, busIds: parsedBusIds };
};

export const parseDockingInstructions = (
  input: string,
): DockingInstruction[] => {
  const parsed = parseLines(input, '\n');
  return parsed.map((element) => {
    const groups = element.match(
      new RegExp('^((mask)|(mem\\[([0-9]+)\\])) = ([X0-9]+)'),
    );
    if (!groups)
      throw new Error(`${element} is not a valid docking instruction`);
    const [_, _lhs, isMask, _mem, memAddress, value] = groups;

    if (isMask) return { mask: value };
    return { memAddress: +memAddress, memValue: +value };
  });
};

export const parseTicketInfo = (input: string): TicketInfo => {
  const [fieldsInfoString, myTicketString, nearbyTicketString] = parseLines(
    input,
    '\n\n',
  );

  const parsedFieldsInfo = parseLines(fieldsInfoString, '\n');
  const fields = parsedFieldsInfo.map((fieldInfo) => {
    const groups = fieldInfo.match(
      new RegExp('^([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$'),
    );
    if (!groups) throw new Error(`${fieldInfo} is not a valid field info`);
    const [_, key, low1, high1, low2, high2] = groups;
    return {
      key,
      low1: +low1,
      high1: +high1,
      low2: +low2,
      high2: +high2,
    };
  });

  const parsedMyTicket = parseLines(myTicketString, '\n');
  const myTicket = parseInput(parsedMyTicket[1]) as number[];

  const parsedNearbyTickets = parseLines(nearbyTicketString, '\n');
  const nearbyTickets = parsedNearbyTickets
    .slice(1)
    .map((nearbyTicketString) => parseInput(nearbyTicketString) as number[]);
  return { fields, myTicket, nearbyTickets };
};

export const parseSatelliteResponse = (input: string): SatelliteResponse => {
  const [rulesString, messagesString] = parseLines(input, '\n\n');
  const parsedRules = parseLines(rulesString, '\n');
  const rules = parsedRules.reduce((acc, parsedRule) => {
    const groups = parsedRule.match(
      new RegExp('^([0-9]+): (("([a-z])")|([0-9 ]+)|([0-9 \\|]+))$'),
    );
    if (!groups) throw new Error(`${parsedRule} is not a valid satellite rule`);
    const [_, ruleNum, subRule, _a, pattern] = groups;
    if (pattern) {
      return { ...acc, [ruleNum]: { pattern, subRules: undefined } };
    } else {
      const subRuleGroups = subRule.split('|');
      const subRules = subRuleGroups.map((subRuleGroup) =>
        subRuleGroup
          .split(' ')
          .filter((el) => el !== '')
          .map((el) => +el),
      );
      return {
        ...acc,
        [ruleNum]: { pattern: undefined, subRules },
      };
    }
  }, {});
  const messages = parseLines(messagesString, '\n');
  return { rules, messages };
};

export const parseSatelliteImages = (
  input: string,
): Record<number, SatelliteImage> => {
  const parsedImages = parseLines(input, '\n\n');
  return parsedImages.reduce((acc, parsedImage) => {
    const [idLine, ...image] = parseLines(parsedImage, '\n');
    const idGroups = idLine.match(new RegExp('^Tile ([0-9]+):$'));
    if (!idGroups) throw new Error(`${idLine} is not a valid tile id`);
    const [_, id] = idGroups;
    const { left, right } = image.reduce(
      (acc, row) => {
        return {
          left: acc.left + row[0],
          right: acc.right + row[row.length - 1],
        };
      },
      {
        left: '',
        right: '',
      },
    );
    return {
      ...acc,
      [id]: {
        id: +id,
        image,
        borders: [image[0], right, image[image.length - 1], left],
        top: image[0],
        right,
        bottom: image[image.length - 1],
        left,
      },
    };
  }, {});
};
