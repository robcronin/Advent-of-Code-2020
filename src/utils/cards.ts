import { isArrayInArray } from './array';

export const playNormalRound = (
  player1: number[],
  player2: number[],
): [number[], number[]] => {
  const newPlayer1 = [...player1];
  const newPlayer2 = [...player2];
  const player1Card = newPlayer1.shift();
  const player2Card = newPlayer2.shift();
  if (!player1Card || !player2Card) throw new Error('One player has no cards');
  if (player1Card > player2Card) {
    newPlayer1.push(player1Card, player2Card);
  } else {
    newPlayer2.push(player2Card, player1Card);
  }
  return [newPlayer1, newPlayer2];
};

export const playNormalToFinish = (
  player1: number[],
  player2: number[],
): number[] => {
  let hand1 = player1;
  let hand2 = player2;
  while (hand1.length > 0 && hand2.length > 0) {
    [hand1, hand2] = playNormalRound(hand1, hand2);
  }
  return hand1.length > 0 ? hand1 : hand2;
};

export const playRecursiveRound = (
  player1: number[],
  player2: number[],
): [number[], number[]] => {
  const newPlayer1 = [...player1];
  const newPlayer2 = [...player2];
  const player1Card = newPlayer1.shift();
  const player2Card = newPlayer2.shift();
  if (!player1Card || !player2Card) throw new Error('One player has no cards');
  const player1NumRemaining = newPlayer1.length;
  const player2NumRemaining = newPlayer2.length;
  if (player1Card > player1NumRemaining || player2Card > player2NumRemaining) {
    return playNormalRound(player1, player2);
  } else {
    const [winningPlayer] = playRecursiveToFinish(
      newPlayer1.slice(0, player1Card),
      newPlayer2.slice(0, player2Card),
    );
    if (winningPlayer === 1) {
      newPlayer1.push(player1Card, player2Card);
    } else {
      newPlayer2.push(player2Card, player1Card);
    }
    return [newPlayer1, newPlayer2];
  }
};

export const playRecursiveToFinish = (
  player1: number[],
  player2: number[],
): [1 | 2, number[]] => {
  let hand1 = [...player1];
  let hand2 = [...player2];
  let previousHand1s: number[][] = [];
  let previousHand2s: number[][] = [];
  while (hand1.length > 0 && hand2.length > 0) {
    if (
      isArrayInArray(hand1, previousHand1s) &&
      isArrayInArray(hand2, previousHand2s)
    ) {
      return [1, hand1];
    }
    previousHand1s.push(hand1);
    previousHand2s.push(hand2);
    [hand1, hand2] = playRecursiveRound(hand1, hand2);
  }
  return hand1.length > 0 ? [1, hand1] : [2, hand2];
};

export const calculateWinningScore = (winningHand: number[]): number => {
  let scoreMultiplier = winningHand.length;
  let result = 0;
  winningHand.forEach((card) => {
    result += scoreMultiplier * card;
    scoreMultiplier--;
  });

  return result;
};
