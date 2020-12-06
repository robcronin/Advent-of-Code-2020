import { countArrayByCondition } from '../utils/count';
import { PasswordConfig } from '../utils/input';
import { isValidOldPolicy, isValidPolicy } from '../utils/password';

export const day2 = (passwordConfigs: PasswordConfig[]) =>
  countArrayByCondition(passwordConfigs, isValidOldPolicy);

export const day2part2 = (passwordConfigs: PasswordConfig[]) =>
  countArrayByCondition(passwordConfigs, isValidPolicy);
