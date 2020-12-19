import { sumArrayByFormula } from './array';
import { Ticket, TicketFieldInfo } from './input';

export const isNumInvalidForField = (
  ticketNum: number,
  fieldInfo: TicketFieldInfo,
): boolean => {
  const { low1, high1, low2, high2 } = fieldInfo;
  return (
    (ticketNum < low1 || ticketNum > high1) &&
    (ticketNum < low2 || ticketNum > high2)
  );
};

export const isNumInvalidForEveryField = (
  ticketNum: number,
  fieldsInfo: TicketFieldInfo[],
): boolean =>
  fieldsInfo.every((fieldInfo) => isNumInvalidForField(ticketNum, fieldInfo));

export const isTicketCompletelyInvalid = (
  ticket: Ticket,
  fieldsInfo: TicketFieldInfo[],
): boolean =>
  ticket.some((ticketNum) => isNumInvalidForEveryField(ticketNum, fieldsInfo));

export const getNumsInvalidForEveryField = (
  ticket: Ticket,
  fieldsInfo: TicketFieldInfo[],
): number[] =>
  ticket.reduce(
    (acc: number[], ticketNum) =>
      isNumInvalidForEveryField(ticketNum, fieldsInfo)
        ? [...acc, ticketNum]
        : acc,
    [],
  );

export const getValidTickets = (tickets: Ticket[], fields: TicketFieldInfo[]) =>
  tickets.filter((ticket) => !isTicketCompletelyInvalid(ticket, fields));

export const getNumValidIndexesForFields = (
  validIndexesForFields: Record<string, Set<number>>,
): number =>
  sumArrayByFormula(Object.values(validIndexesForFields), (set) => set.size);

export const getValidIndexesForFields = (
  ticketFields: TicketFieldInfo[],
  validTickets: Ticket[],
): Record<string, Set<number>> => {
  const numFields = ticketFields.length;
  const validIndexesForFields = ticketFields.reduce(
    (acc: Record<string, Set<number>>, field) => {
      const validIds = new Set<number>();
      for (let i = 0; i < numFields; i++) {
        validIds.add(i);
      }
      return { ...acc, [field.key]: validIds };
    },
    {},
  );
  validTickets.forEach((nearbyTicket) => {
    nearbyTicket.forEach((ticketNum, index) => {
      ticketFields.forEach((field) => {
        if (isNumInvalidForField(ticketNum, field)) {
          validIndexesForFields[field.key].delete(index);
        }
      });
    });
  });
  return validIndexesForFields;
};

export const getIndexesForField = (
  ticketFields: TicketFieldInfo[],
  validIndexesForFields: Record<string, Set<number>>,
): Record<string, number> => {
  const validSingleIndexForFields = { ...validIndexesForFields };
  let numValidIndexesForFields = getNumValidIndexesForFields(
    validSingleIndexForFields,
  );

  while (numValidIndexesForFields > ticketFields.length) {
    Object.keys(validSingleIndexForFields).forEach((validIndexKey) => {
      const indexesForKey = validSingleIndexForFields[validIndexKey];
      if (indexesForKey.size === 1) {
        const indexToRemove: number = indexesForKey.values().next().value;
        Object.values(validSingleIndexForFields).forEach((validLocation) => {
          if (validLocation.size !== 1) {
            validLocation.delete(indexToRemove);
          }
        });
      }
    });
    numValidIndexesForFields = getNumValidIndexesForFields(
      validSingleIndexForFields,
    );
  }

  return Object.keys(validSingleIndexForFields).reduce(
    (acc, validSingleIndexForFieldKey) => {
      const validIndex = validSingleIndexForFields[validSingleIndexForFieldKey]
        .values()
        .next().value;
      return { ...acc, [validSingleIndexForFieldKey]: validIndex };
    },
    {},
  );
};
