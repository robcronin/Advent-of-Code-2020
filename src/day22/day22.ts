import {
  calculateWinningScore,
  playNormalToFinish,
  playRecursiveToFinish,
} from '../utils/cards';
import { StartingHands } from '../utils/input';

export const day22 = (startingHands: StartingHands) => {
  const { player1, player2 } = startingHands;
  const winningHand = playNormalToFinish(player1, player2);
  return calculateWinningScore(winningHand);
};
export const day22part2 = (startingHands: StartingHands) => {
  const { player1, player2 } = startingHands;
  const [_winner, winningHand] = playRecursiveToFinish(player1, player2);
  return calculateWinningScore(winningHand);
};
