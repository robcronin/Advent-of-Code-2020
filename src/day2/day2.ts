import { PasswordConfig } from '../utils/input';
import {
  countValidPasswords,
  isValidOldPolicy,
  isValidPolicy,
} from '../utils/password';

export const day2 = (input: PasswordConfig[]) => {
  return countValidPasswords(input, isValidOldPolicy);
};

export const day2part2 = (input: PasswordConfig[]) => {
  return countValidPasswords(input, isValidPolicy);
};
