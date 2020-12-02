import { countOccurences } from './count';
import { PasswordConfig } from './input';

export const isValidOldPolicy = (passwordConfig: PasswordConfig) => {
  const { start, end, letter, password } = passwordConfig;
  const count = countOccurences(password, letter);
  if (count >= start && count <= end) return true;
  return false;
};

export const isValidPolicy = (passwordConfig: PasswordConfig) => {
  const { start, end, letter, password } = passwordConfig;
  let count = 0;
  if (password[start - 1] === letter) count++;
  if (password[end - 1] === letter) count++;
  if (count === 1) return true;
  return false;
};

export const countValidPasswords = (
  input: PasswordConfig[],
  policyCheck: (passwordConfig: PasswordConfig) => boolean,
) => {
  return input.reduce(
    (count, passwordConfig) => count + (policyCheck(passwordConfig) ? 1 : 0),
    0,
  );
};
