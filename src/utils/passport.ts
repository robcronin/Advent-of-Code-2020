import { Passport } from './input';

export const hasRequiredNorthPoleCredentialsFields = (passport: Passport) =>
  !!passport.byr &&
  !!passport.iyr &&
  !!passport.eyr &&
  !!passport.hgt &&
  !!passport.hcl &&
  !!passport.ecl &&
  !!passport.pid;

export const isValidBirthYear = (byr: string | undefined): boolean =>
  !!byr && +byr >= 1920 && +byr <= 2002;

export const isValidIssueYear = (iyr: string | undefined): boolean =>
  !!iyr && +iyr >= 2010 && +iyr <= 2020;

export const isValidExpirationYear = (eyr: string | undefined): boolean =>
  !!eyr && +eyr >= 2020 && +eyr <= 2030;

export const isValidHeight = (hgt: string | undefined): boolean =>
  !!hgt &&
  !!hgt.match(new RegExp('^((1[5-8][0-9]|19[0-3])cm)|((59|6[0-9]|7[0-6])in)$'));

export const isValidHairColor = (hcl: string | undefined): boolean =>
  !!hcl && !!hcl.match(new RegExp('^#[0-9A-Fa-f]{6}$'));

export const isValidEyeColor = (ecl: string | undefined): boolean =>
  !!ecl && !!ecl.match(new RegExp('^blu|amb|brn|gry|grn|hzl|oth$'));

export const isValidPID = (pid: string | undefined): boolean =>
  !!pid && !!pid.match(new RegExp('^[0-9]{9}$'));

export const isValidNorthPoleCredentials = (passport: Passport) =>
  isValidBirthYear(passport.byr) &&
  isValidIssueYear(passport.iyr) &&
  isValidExpirationYear(passport.eyr) &&
  isValidHeight(passport.hgt) &&
  isValidHairColor(passport.hcl) &&
  isValidEyeColor(passport.ecl) &&
  isValidPID(passport.pid);
