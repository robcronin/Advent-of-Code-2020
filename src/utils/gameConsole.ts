import { GameBootInstruction, GameBootOperation } from './input';

interface GameBootInstructionSwap {
  original: GameBootOperation;
  new: GameBootOperation;
}

export const executeGameBoot = (
  gameBootInstructions: GameBootInstruction[],
): { accumulator: number; finished: boolean } => {
  let accumulator = 0;
  let instructionIndex = 0;
  let finished = false;
  const executedInstructions = new Set<number>();
  while (true) {
    if (executedInstructions.has(instructionIndex)) break;
    if (instructionIndex === gameBootInstructions.length) {
      finished = true;
      break;
    }
    executedInstructions.add(instructionIndex);

    const { operation, argument } = gameBootInstructions[instructionIndex];
    if (operation === 'nop') {
      instructionIndex++;
    } else if (operation === 'jmp') {
      instructionIndex += argument;
    } else {
      accumulator += argument;
      instructionIndex++;
    }
  }
  return { accumulator, finished };
};

export const trySwapsToFinishGameBoot = (
  gameBootInstructions: GameBootInstruction[],
  gameBootSwaps: GameBootInstructionSwap[],
): { accumulator: number | undefined } => {
  let accumulatorAtFinish: number | undefined;
  gameBootInstructions.some((gameBootInstruction) => {
    if (accumulatorAtFinish) return true;
    gameBootSwaps.forEach((gameBootSwap) => {
      if (gameBootInstruction.operation === gameBootSwap.original) {
        gameBootInstruction.operation = gameBootSwap.new;
        const { accumulator, finished } = executeGameBoot(gameBootInstructions);
        gameBootInstruction.operation = gameBootSwap.original;
        if (finished) accumulatorAtFinish = accumulator;
      }
    });
  });
  return { accumulator: accumulatorAtFinish };
};
