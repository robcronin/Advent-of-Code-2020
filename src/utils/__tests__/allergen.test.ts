import { getAllergenMap } from '../allergen';

describe('getAllergenMap', () => {
  it('should get the allergen list', () => {
    expect(
      getAllergenMap([
        {
          ingredients: ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'],
          allergens: ['dairy', 'fish'],
        },
        {
          ingredients: ['trh', 'fvjkl', 'sbzzf', 'mxmxvkd'],
          allergens: ['dairy'],
        },
        { ingredients: ['sqjhc', 'fvjkl'], allergens: ['soy'] },
        { ingredients: ['sqjhc', 'mxmxvkd', 'sbzzf'], allergens: ['fish'] },
      ]),
    ).toEqual({ dairy: 'mxmxvkd', fish: 'sqjhc', soy: 'fvjkl' });
  });
});
