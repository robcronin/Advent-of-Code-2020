import { Ticket, TicketFieldInfo } from '../input';
import {
  getIndexesForField,
  getNumsInvalidForEveryField,
  getNumValidIndexesForFields,
  getValidIndexesForFields,
  getValidTickets,
  isNumInvalidForEveryField,
  isNumInvalidForField,
  isTicketCompletelyInvalid,
} from '../ticket';

const fieldsInfo: TicketFieldInfo[] = [
  {
    key: 'class',
    low1: 1,
    high1: 3,
    low2: 5,
    high2: 7,
  },
  {
    key: 'row',
    low1: 6,
    high1: 11,
    low2: 33,
    high2: 44,
  },
  {
    key: 'seat',
    low1: 13,
    high1: 40,
    low2: 45,
    high2: 50,
  },
];

const tickets: Ticket[] = [
  [40, 4, 50],
  [7, 3, 47],
  [42, 3, 47],
  [38, 6, 12],
];

describe('isNumInvalidForField', () => {
  it('should be true if invalid', () => {
    expect(isNumInvalidForField(4, fieldsInfo[0])).toBe(true);
    expect(isNumInvalidForField(55, fieldsInfo[0])).toBe(true);
    expect(isNumInvalidForField(12, fieldsInfo[0])).toBe(true);
  });
  it('should be false if valid', () => {
    expect(isNumInvalidForField(3, fieldsInfo[0])).toBe(false);
    expect(isNumInvalidForField(35, fieldsInfo[1])).toBe(false);
    expect(isNumInvalidForField(22, fieldsInfo[2])).toBe(false);
  });
});

describe('isNumInvalidForEveryField', () => {
  it('should be true if all invalid', () => {
    expect(isNumInvalidForEveryField(4, fieldsInfo)).toBe(true);
    expect(isNumInvalidForEveryField(55, fieldsInfo)).toBe(true);
    expect(isNumInvalidForEveryField(12, fieldsInfo)).toBe(true);
  });
  it('should be false if one valid', () => {
    expect(isNumInvalidForEveryField(3, fieldsInfo)).toBe(false);
    expect(isNumInvalidForEveryField(35, fieldsInfo)).toBe(false);
    expect(isNumInvalidForEveryField(22, fieldsInfo)).toBe(false);
  });
});

describe('isTicketCompletelyInvalid', () => {
  it('should return true for completely invalid tickets', () => {
    expect(isTicketCompletelyInvalid([0, 1, 2], fieldsInfo)).toBe(true);
    expect(isTicketCompletelyInvalid([40, 4, 50], fieldsInfo)).toBe(true);
    expect(isTicketCompletelyInvalid([55, 2, 20], fieldsInfo)).toBe(true);
    expect(isTicketCompletelyInvalid([38, 6, 12], fieldsInfo)).toBe(true);
  });
  it('should return false for non completely invalid tickets', () => {
    expect(isTicketCompletelyInvalid([7, 3, 47], fieldsInfo)).toBe(false);
  });
});

describe('getNumsInvalidForEveryField', () => {
  it('should return numbers which are completely invalid', () => {
    expect(getNumsInvalidForEveryField([0, 0, 0], fieldsInfo)).toEqual([
      0,
      0,
      0,
    ]);
    expect(getNumsInvalidForEveryField([40, 4, 50], fieldsInfo)).toEqual([4]);
    expect(getNumsInvalidForEveryField([55, 2, 20], fieldsInfo)).toEqual([55]);
    expect(getNumsInvalidForEveryField([38, 6, 12], fieldsInfo)).toEqual([12]);
    expect(getNumsInvalidForEveryField([38, 600, 12], fieldsInfo)).toEqual([
      600,
      12,
    ]);
  });
  it('should return false for non completely invalid tickets', () => {
    expect(getNumsInvalidForEveryField([7, 3, 47], fieldsInfo)).toEqual([]);
  });
});

describe('getValidTickets', () => {
  it('should return the valid tickets', () => {
    expect(getValidTickets(tickets, fieldsInfo)).toEqual([
      [7, 3, 47],
      [42, 3, 47],
    ]);
  });
});

describe('getNumValidIndexesForFields', () => {
  it('should return the number of valid indexes', () => {
    expect(
      getNumValidIndexesForFields({
        seat: new Set([1, 2, 3]),
        row: new Set([1, 2]),
      }),
    ).toBe(5);
  });
});

describe('getValidIndexesForFields', () => {
  it('should get the valid indexes for fields', () => {
    expect(
      getValidIndexesForFields(
        fieldsInfo,
        getValidTickets(tickets, fieldsInfo),
      ),
    ).toEqual({
      class: new Set([1]),
      row: new Set([0]),
      seat: new Set([2]),
    });
  });
});

describe('getIndexesForField', () => {
  it('should get the valid index for each fields', () => {
    expect(
      getIndexesForField(fieldsInfo, {
        class: new Set([1, 2]),
        row: new Set([0, 1, 2]),
        seat: new Set([2]),
      }),
    ).toEqual({
      class: 1,
      row: 0,
      seat: 2,
    });
  });
});
