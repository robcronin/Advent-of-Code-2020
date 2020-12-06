export const countTreesOnSlope = (
  treeMap: string[],
  right: number,
  down: number,
): number => {
  let x = 0;
  let y = 0;
  let numberTrees = 0;
  const height = treeMap.length;
  const width = treeMap[0].length;
  while (y < height) {
    if (treeMap[y][x] === '#') numberTrees++;
    x = (x + right) % width;
    y += down;
  }
  return numberTrees;
};
