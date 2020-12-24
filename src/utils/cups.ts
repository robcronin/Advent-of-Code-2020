export const playCupRound = (cups: number[]): number[] => {
  const totalCups = cups.length;
  let currentCup = cups.shift() as number;
  let movingCups = [cups.shift(), cups.shift(), cups.shift()] as number[];

  let destinationCup = currentCup - 1 === 0 ? totalCups : currentCup - 1;
  while (movingCups.includes(destinationCup)) {
    destinationCup = (destinationCup - 1 + totalCups) % totalCups;
    if (destinationCup === 0) {
      destinationCup = totalCups;
    }
  }
  const destinationCupIndex = cups.indexOf(destinationCup);
  cups.splice(destinationCupIndex + 1, 0, ...movingCups);
  cups.push(currentCup);
  return cups;
};

export const playNumCupRounds = (
  startingCups: number[],
  numRounds: number,
): number[] => {
  let cups = startingCups;
  for (let i = 0; i < numRounds; i++) {
    cups = playCupRound(cups);
  }
  return cups;
};

export const getCupsAfter1 = (cups: number[]): number => {
  let result = '';
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
  cups: number[],
  targetCup: number,
): number => {
  const index = cups.indexOf(targetCup);
  const totalCups = cups.length;
  const cup1 = cups[(index + 1) % totalCups];
  const cup2 = cups[(index + 2) % totalCups];
  return cup1 * cup2;
};
