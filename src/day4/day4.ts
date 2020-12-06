import { countArrayByCondition } from '../utils/array';
import { Passport } from '../utils/input';
import {
  hasRequiredNorthPoleCredentialsFields,
  isValidNorthPoleCredentials,
} from '../utils/passport';

export const day4 = (passports: Passport[]) =>
  countArrayByCondition(passports, hasRequiredNorthPoleCredentialsFields);

export const day4part2 = (passports: Passport[]) =>
  countArrayByCondition(passports, isValidNorthPoleCredentials);
