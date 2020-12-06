import {
  countQuestionsWithAllYes,
  countQuestionsWithAtLeastOneYes,
} from '../customs';

test('countQuestionsWithAtLeastOneYes', () => {
  expect(countQuestionsWithAtLeastOneYes(['abd', 'aced'])).toBe(5);
});

test('countQuestionsWithAllYes', () => {
  expect(countQuestionsWithAllYes(['abd', 'aced'])).toBe(2);
});
