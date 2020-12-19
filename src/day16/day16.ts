import { multArrayByFormula, sumArrayByFormula } from '../utils/array';
import { Ticket, TicketInfo } from '../utils/input';
import {
  getIndexesForField,
  getNumsInvalidForEveryField,
  getValidIndexesForFields,
  getValidTickets,
} from '../utils/ticket';

export const day16 = (ticketInfo: TicketInfo) =>
  ticketInfo.nearbyTickets.reduce((acc: number, nearbyTicket: Ticket) => {
    const invalidNums = getNumsInvalidForEveryField(
      nearbyTicket,
      ticketInfo.fields,
    );
    return acc + sumArrayByFormula(invalidNums, (el) => el);
  }, 0);

export const day16part2 = (
  ticketInfo: TicketInfo,
  targetFieldStart: string,
) => {
  const { fields, nearbyTickets, myTicket } = ticketInfo;

  const validTickets = getValidTickets(nearbyTickets, fields);
  const validIndexesForFields = getValidIndexesForFields(fields, validTickets);
  const indexesForField = getIndexesForField(fields, validIndexesForFields);

  const targetIndexes = Object.entries(indexesForField).reduce(
    (acc: number[], [fieldKey, index]) =>
      fieldKey.startsWith(targetFieldStart) ? [...acc, index] : acc,
    [],
  );

  return multArrayByFormula(targetIndexes, (index) => myTicket[index]);
};
