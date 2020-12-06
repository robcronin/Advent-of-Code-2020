import { sumArrayByFormula } from '../utils/count';
import {
  countQuestionsWithAllYes,
  countQuestionsWithAtLeastOneYes,
} from '../utils/customs';
import { CustomsGroupAnswers } from '../utils/input';

export const day6 = (allGroupAnswers: CustomsGroupAnswers) =>
  sumArrayByFormula(allGroupAnswers, countQuestionsWithAtLeastOneYes);

export const day6part2 = (allGroupAnswers: CustomsGroupAnswers) =>
  sumArrayByFormula(allGroupAnswers, countQuestionsWithAllYes);
