export const findAllIndexesOfChar = (
  haystack: string,
  needle: string,
): number[] => {
  const result: number[] = [];
  let startPoint = 0;
  while (haystack.indexOf(needle, startPoint) !== -1) {
    const index = haystack.indexOf(needle, startPoint);
    result.push(index);
    startPoint = index + 1;
  }
  return result;
};

export const findLastIncidentBeforeIndex = (
  haystack: string,
  needle: string,
  index: number,
): number => {
  const relevant = haystack.slice(0, index);
  const allIndexes = findAllIndexesOfChar(relevant, needle);
  if (allIndexes.length > 0) {
    return allIndexes[allIndexes.length - 1];
  }
  return -1;
};
