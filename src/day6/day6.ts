import {
  countQuestionsWithAllYes,
  countQuestionsWithAtLeastOneYes,
} from '../utils/customs';
import { CustomsGroupAnswers } from '../utils/input';

export const day6 = (allGroupAnswers: CustomsGroupAnswers) => {
  return allGroupAnswers.reduce(
    (result, groupAnswers) =>
      result + countQuestionsWithAtLeastOneYes(groupAnswers),
    0,
  );
};
export const day6part2 = (allGroupAnswers: CustomsGroupAnswers) => {
  return allGroupAnswers.reduce(
    (result, groupAnswers) => result + countQuestionsWithAllYes(groupAnswers),
    0,
  );
};
