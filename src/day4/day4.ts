import { Passport } from '../utils/input';
import {
  hasRequiredNorthPoleCredentialsFields,
  isValidNorthPoleCredentials,
} from '../utils/passport';

export const day4 = (input: Passport[]) => {
  return input.reduce(
    (numValid, passport) =>
      numValid + (hasRequiredNorthPoleCredentialsFields(passport) ? 1 : 0),
    0,
  );
};
export const day4part2 = (input: Passport[]) => {
  return input.reduce(
    (numValid, passport) =>
      numValid + (isValidNorthPoleCredentials(passport) ? 1 : 0),
    0,
  );
};
