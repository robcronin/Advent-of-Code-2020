import { Ingredients } from './input';

export const getAllergenMap = (
  foodList: Ingredients[],
): Record<string, string> => {
  const allergenOptions: Record<string, string[][]> = {};
  foodList.forEach((ingredient) => {
    ingredient.allergens.forEach((allergen) => {
      if (allergenOptions[allergen]) {
        allergenOptions[allergen].push(ingredient.ingredients);
      } else {
        allergenOptions[allergen] = [ingredient.ingredients];
      }
    });
  });

  let reducedAllergenOptions: Record<string, string[]> = Object.keys(
    allergenOptions,
  ).reduce((acc, allergenOptionKey) => {
    const allergenOption = allergenOptions[allergenOptionKey];
    const newAllergens = allergenOption.map((allergens) => {
      return allergens.filter((allergen, index) => {
        return allergenOption.every((allergens) =>
          allergens.includes(allergen),
        );
      });
    });
    return { ...acc, [allergenOptionKey]: newAllergens[0] };
  }, {});

  let areSomeMultiple = Object.values(reducedAllergenOptions).some(
    (reducedAllergenOption) => reducedAllergenOption.length > 1,
  );
  while (areSomeMultiple) {
    Object.values(reducedAllergenOptions).forEach((reducedAllergenOption) => {
      if (reducedAllergenOption.length === 1) {
        Object.values(reducedAllergenOptions).forEach(
          (innerReducedAllergenOption) => {
            if (innerReducedAllergenOption.length !== 1) {
              const indexToRemove = innerReducedAllergenOption.indexOf(
                reducedAllergenOption[0],
              );
              if (indexToRemove !== -1) {
                innerReducedAllergenOption.splice(indexToRemove, 1);
              }
            }
          },
        );
        reducedAllergenOption;
      }
    });
    areSomeMultiple = Object.values(reducedAllergenOptions).some(
      (reducedAllergenOption) => reducedAllergenOption.length > 1,
    );
  }

  return Object.keys(reducedAllergenOptions).reduce(
    (acc, reducedAllergenOptionKey) => {
      const val = reducedAllergenOptions[reducedAllergenOptionKey][0];
      return { ...acc, [reducedAllergenOptionKey]: val };
    },
    {},
  );
};
