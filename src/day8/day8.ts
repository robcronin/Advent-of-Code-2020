import {
  executeGameBoot,
  trySwapsToFinishGameBoot,
} from '../utils/gameConsole';
import { GameBootInstruction } from '../utils/input';

export const day8 = (gameBootInstructions: GameBootInstruction[]) =>
  executeGameBoot(gameBootInstructions).accumulator;

export const day8part2 = (gameBootInstructions: GameBootInstruction[]) =>
  trySwapsToFinishGameBoot(gameBootInstructions, [
    { original: 'nop', new: 'jmp' },
    { original: 'jmp', new: 'nop' },
  ]).accumulator;
