import { countArrayByCondition } from './array';

export const countQuestionsWithAtLeastOneYes = (
  groupAnswers: string[],
): number => {
  const combinedAnswers = groupAnswers.reduce(
    (acc, answer) => acc + answer,
    '',
  );
  return new Set([...combinedAnswers]).size;
};

export const countQuestionsWithAllYes = (groupAnswers: string[]): number => {
  const yesesPerQuestion = groupAnswers.reduce(
    (yesesPerQuestion: Record<string, number>, personAnswers) => {
      [...personAnswers].forEach((answer) => {
        if (yesesPerQuestion[answer]) {
          yesesPerQuestion[answer]++;
        } else {
          yesesPerQuestion[answer] = 1;
        }
      });
      return yesesPerQuestion;
    },
    {},
  );

  return countArrayByCondition(
    Object.values(yesesPerQuestion),
    (numYeses) => numYeses === groupAnswers.length,
  );
};
