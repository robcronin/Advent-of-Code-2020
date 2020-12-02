export interface PasswordConfig {
  start: number;
  end: number;
  letter: string;
  password: string;
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
    return input.map((e) => Number(e));
  }
  return input;
};

export const parseInput = (input: string) => {
  const inputArray = input.split(getDelimiter(input));
  const trimmed = inputArray.map((e) => e.trim());
  return mapToNumberIfNecessary(trimmed);
};

export const parsePasswordConfigs = (input: string): PasswordConfig[] => {
  const inputArray = input.split(getDelimiter(input));
  const trimmed = inputArray.map((e) => e.trim());
  return trimmed.map((e) => {
    const [range, letterColon, password] = e.split(' ');
    const [startString, endString] = range.split('-');
    const letter = letterColon[0];
    return {
      start: Number(startString),
      end: Number(endString),
      letter,
      password,
    };
  });
};
