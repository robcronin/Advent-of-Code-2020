import { getAllergenMap } from '../utils/allergen';
import { Ingredients } from '../utils/input';

export const day21 = (foodList: Ingredients[]) => {
  const allergenMap = getAllergenMap(foodList);
  const ingredientsWithAllergens = Object.values(allergenMap);
  let count = 0;
  foodList.forEach((ingredient) =>
    ingredient.ingredients.forEach((ingredient) => {
      if (!ingredientsWithAllergens.includes(ingredient)) {
        count++;
      }
    }),
  );
  return count;
};
export const day21part2 = (foodList: Ingredients[]) => {
  const allergenMap = getAllergenMap(foodList);
  const sortedKeys = Object.keys(allergenMap).sort();
  return sortedKeys.reduce(
    (result, key) =>
      result ? result + ',' + allergenMap[key] : allergenMap[key],
    '',
  );
};
