import { executeGameBoot, trySwapsToFinishGameBoot } from '../gameConsole';
import { GameBootInstruction } from '../input';

const gameBootInstructions: GameBootInstruction[] = [
  {
    operation: 'nop',
    argument: 0,
  },
  {
    operation: 'acc',
    argument: -99,
  },
  {
    operation: 'acc',
    argument: 20,
  },
];

describe('executeGameBoot', () => {
  it('should return accumulator and finished if it gets stuck in a loop', () => {
    expect(
      executeGameBoot([
        ...gameBootInstructions,
        { operation: 'jmp', argument: -1 },
      ]),
    ).toEqual({
      accumulator: -79,
      finished: false,
    });
  });
  it('should return accumulator and finished if it finishes', () => {
    expect(executeGameBoot(gameBootInstructions)).toEqual({
      accumulator: -79,
      finished: true,
    });
  });
});

describe('trySwapsToFinishGameBoot', () => {
  it('should find accumulator when instruction to finish loop is found', () => {
    expect(
      trySwapsToFinishGameBoot(
        [...gameBootInstructions, { operation: 'jmp', argument: -1 }],
        [{ original: 'jmp', new: 'acc' }],
      ),
    ).toEqual({
      accumulator: -80,
    });
  });
  it('should return undefined accumulator when fails to find instruction to finish loop', () => {
    expect(
      trySwapsToFinishGameBoot(
        [...gameBootInstructions, { operation: 'jmp', argument: -1 }],
        [{ original: 'acc', new: 'nop' }],
      ),
    ).toEqual({
      accumulator: undefined,
    });
  });
});
