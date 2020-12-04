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

export const isValidHeight = (hgt: string | undefined): boolean => {
  if (!hgt) return false;
  const unit = hgt.slice(-2);
  if (unit !== 'cm' && unit !== 'in') return false;
  const value = hgt.slice(0, hgt.length - 2);
  if (unit === 'cm' && +value >= 150 && +value <= 193) return true;
  if (unit === 'in' && +value >= 59 && +value <= 76) return true;
  return false;
};

export const isValidHairColor = (hcl: string | undefined): boolean => {
  return !!hcl && !!hcl.match(new RegExp('^#[0-9A-Fa-f]{6}$'));
};

export const isValidEyeColor = (ecl: string | undefined): boolean => {
  return (
    !!ecl &&
    (ecl === 'amb' ||
      ecl === 'blu' ||
      ecl === 'brn' ||
      ecl === 'gry' ||
      ecl === 'grn' ||
      ecl === 'hzl' ||
      ecl === 'oth')
  );
};

export const isValidPID = (pid: string | undefined): boolean => {
  return !!pid && !!pid.match(new RegExp('^[0-9]{9}$'));
};

export const isValidNorthPoleCredentials = (passport: Passport) =>
  isValidBirthYear(passport.byr) &&
  isValidIssueYear(passport.iyr) &&
  isValidExpirationYear(passport.eyr) &&
  isValidHeight(passport.hgt) &&
  isValidHairColor(passport.hcl) &&
  isValidEyeColor(passport.ecl) &&
  isValidPID(passport.pid);
