export const countTreesOnSlope = (
  input: string[],
  right: number,
  down: number,
): number => {
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
