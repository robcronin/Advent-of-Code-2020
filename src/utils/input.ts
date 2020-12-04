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
