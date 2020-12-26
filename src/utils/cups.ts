import { LinkedList, LinkNode } from './linkedList';

export const playCupRound = (cupsList: LinkedList): void => {
  const totalCups = cupsList.length;
  let currentCup = cupsList.shift() as number;
  let movingCups = [
    cupsList.shift(),
    cupsList.shift(),
    cupsList.shift(),
  ] as number[];

  let destinationCup = currentCup - 1 === 0 ? totalCups : currentCup - 1;
  while (movingCups.includes(destinationCup) || currentCup === destinationCup) {
    destinationCup = (destinationCup - 1 + totalCups) % totalCups;
    if (destinationCup === 0) {
      destinationCup = totalCups;
    }
  }
  const destinationCupNode = cupsList.findNode(destinationCup);
  if (!destinationCupNode)
    throw new Error(`No node found for value: ${destinationCup}`);
  cupsList.splice(destinationCupNode, 0, movingCups);
  cupsList.push(currentCup);
};

export const playNumCupRounds = (
  cupsList: LinkedList,
  numRounds: number,
): void => {
  for (let i = 0; i < numRounds; i++) {
    playCupRound(cupsList);
  }
};

export const getCupsAfter1 = (cupsList: LinkedList): number => {
  let result = '';
  const cups = cupsList.convertToArray();
  const totalCups = cups.length;
  let index = (cups.indexOf(1) + 1) % totalCups;
  for (let iter = 0; iter < totalCups - 1; iter++) {
    result += cups[index];
    index = (index + 1) % totalCups;
  }
  return +result;
};

export const generateExtraCups = (cups: number[], totalCups: number) => {
  const newCups = [...cups];
  for (let i = cups.length + 1; i <= totalCups; i++) {
    newCups.push(i);
  }
  return newCups;
};

export const findProductNextTwoCups = (
  cupsList: LinkedList,
  targetCup: number,
): number => {
  const targetNode = cupsList.findNode(targetCup) as LinkNode;
  const cup1Node = targetNode.next || cupsList.head;
  if (!cup1Node) throw new Error(`No cup found to the right of ${targetCup}`);
  const cup2Node = cup1Node.next || cupsList.head;
  if (!cup2Node)
    throw new Error(`No cup found two to the right of ${targetCup}`);

  const cup1 = cup1Node.value;
  const cup2 = cup2Node.value;
  return cup1 * cup2;
};
