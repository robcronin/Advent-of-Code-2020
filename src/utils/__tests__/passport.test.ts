import { Passport } from '../input';
import {
  hasRequiredNorthPoleCredentialsFields,
  isValidBirthYear,
  isValidExpirationYear,
  isValidEyeColor,
  isValidHairColor,
  isValidHeight,
  isValidIssueYear,
  isValidNorthPoleCredentials,
  isValidPID,
} from '../passport';

describe('hasRequiredNorthPoleCredentialsFields', () => {
  const validPassport: Passport = {
    byr: 'test byr',
    iyr: 'test iyr',
    eyr: 'test eyr',
    hgt: 'test hgt',
    hcl: 'test hcl',
    ecl: 'test ecl',
    pid: 'test pid',
    cid: 'test cid',
  };
  it('should return valid if valid passport', () => {
    expect(hasRequiredNorthPoleCredentialsFields(validPassport)).toBe(true);
  });
  it('should return invalid if missing a field', () => {
    const { byr, ...invalidNorthPoleCredentials } = validPassport;
    expect(
      hasRequiredNorthPoleCredentialsFields(invalidNorthPoleCredentials),
    ).toBe(false);
  });
  it('should return valid if missing cid', () => {
    const { cid, ...validNorthPoleCredentials } = validPassport;
    expect(
      hasRequiredNorthPoleCredentialsFields(validNorthPoleCredentials),
    ).toBe(true);
  });
});

describe('validation rules', () => {
  describe('isValidBirthYear', () => {
    it('should return true for low valid birth year', () => {
      expect(isValidBirthYear('1920')).toBe(true);
    });
    it('should return true for high valid birth year', () => {
      expect(isValidBirthYear('2002')).toBe(true);
    });
    it('should return false for invalid birth year', () => {
      expect(isValidBirthYear('994')).toBe(false);
    });
    it('should return false for non number', () => {
      expect(isValidBirthYear('abc')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidBirthYear(undefined)).toBe(false);
    });
  });
  describe('isValidIssueYear', () => {
    it('should return true for low valid issue year', () => {
      expect(isValidIssueYear('2010')).toBe(true);
    });
    it('should return true for high valid issue year', () => {
      expect(isValidIssueYear('2020')).toBe(true);
    });
    it('should return false for invalid issue year', () => {
      expect(isValidIssueYear('2000')).toBe(false);
    });
    it('should return false for non number', () => {
      expect(isValidIssueYear('abc')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidIssueYear(undefined)).toBe(false);
    });
  });
  describe('isValidExpirationYear', () => {
    it('should return true for low valid expiration year', () => {
      expect(isValidExpirationYear('2020')).toBe(true);
    });
    it('should return true for high valid expiration year', () => {
      expect(isValidExpirationYear('2030')).toBe(true);
    });
    it('should return false for invalid expiration year', () => {
      expect(isValidExpirationYear('2010')).toBe(false);
    });
    it('should return false for non number', () => {
      expect(isValidExpirationYear('abc')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidExpirationYear(undefined)).toBe(false);
    });
  });
  describe('isValidHeight', () => {
    it('should return true for low cm height', () => {
      expect(isValidHeight('150cm')).toBe(true);
    });
    it('should return true for high cm height', () => {
      expect(isValidHeight('193cm')).toBe(true);
    });
    it('should return false for invalid cm height', () => {
      expect(isValidHeight('195cm')).toBe(false);
    });
    it('should return true for low in height', () => {
      expect(isValidHeight('59in')).toBe(true);
    });
    it('should return true for high in height', () => {
      expect(isValidHeight('76in')).toBe(true);
    });
    it('should return false for invalid in height', () => {
      expect(isValidHeight('80in')).toBe(false);
    });
    it('should return false for wrong unit', () => {
      expect(isValidHeight('1m')).toBe(false);
    });
    it('should return false for non number', () => {
      expect(isValidHeight('abc')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidHeight(undefined)).toBe(false);
    });
  });
  describe('isValidHairColor', () => {
    it('should return true for valid hair color', () => {
      expect(isValidHairColor('#aBC190')).toBe(true);
    });
    it('should return false for hair color without #', () => {
      expect(isValidHairColor('aBC190')).toBe(false);
    });
    it('should return false for hair color without extra letter', () => {
      expect(isValidHairColor('#aBC190a')).toBe(false);
    });
    it('should return false for hair color with missing letter', () => {
      expect(isValidHairColor('#aBC19')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidHairColor(undefined)).toBe(false);
    });
  });
  describe('isValidEyeColor', () => {
    it('should return true for valid eye color', () => {
      expect(isValidEyeColor('blu')).toBe(true);
    });
    it('should return false for invalid eye color', () => {
      expect(isValidEyeColor('red')).toBe(false);
    });
    it('should return false for partial valid eye color', () => {
      expect(isValidEyeColor('b')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidEyeColor(undefined)).toBe(false);
    });
  });
  describe('isValidPID', () => {
    it('should return true for valid PID', () => {
      expect(isValidPID('012345678')).toBe(true);
    });
    it('should return false for too many numbers', () => {
      expect(isValidPID('0123456789')).toBe(false);
    });
    it('should return false for too little numbers', () => {
      expect(isValidPID('01234567')).toBe(false);
    });
    it('should return false for non numbers', () => {
      expect(isValidPID('01234567a')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(isValidPID(undefined)).toBe(false);
    });
  });
  describe('isValidNorthPoleCredentials', () => {
    it('should return true for valid PID', () => {
      expect(
        isValidNorthPoleCredentials({
          ecl: 'brn',
          byr: '1994',
          eyr: '2025',
          hcl: '#cfa07d',
          hgt: '59in',
          iyr: '2011',
          pid: '166559648',
        }),
      ).toBe(true);
    });
  });
});
