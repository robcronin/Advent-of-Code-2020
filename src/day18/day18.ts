import { sumArrayByFormula } from '../utils/array';
import { runCalculation } from '../utils/newMath';

export const day18 = (calculations: string[]) => {
  return sumArrayByFormula(calculations, (calc) => runCalculation(calc, false));
};
export const day18part2 = (calculations: string[]) => {
  return sumArrayByFormula(calculations, (calc) => runCalculation(calc, true));
};
