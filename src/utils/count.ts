export const countOccurences = (haystack: string, needle: string) => {
  return (haystack.match(new RegExp(needle, 'g')) || []).length;
};
