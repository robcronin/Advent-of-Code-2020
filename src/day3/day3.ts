const countTrees = (input: string[], right: number, down: number): number => {
  let x = 0;
  let y = 0;
  let numberTrees = 0;
  const height = input.length;
  const width = input[0].length;
  while (y < height) {
    if (input[y][x] === '#') numberTrees++;
    x = (x + right) % width;
    y += down;
  }
  return numberTrees;
};

export const day3 = (input: string[]) => {
  return countTrees(input, 3, 1);
};
export const day3part2 = (input: string[]) => {
  return (
    countTrees(input, 1, 1) *
    countTrees(input, 3, 1) *
    countTrees(input, 5, 1) *
    countTrees(input, 7, 1) *
    countTrees(input, 1, 2)
  );
};
