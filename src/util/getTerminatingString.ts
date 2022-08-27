export const getTerminatingString = (
  index: number,
  length: number,
  translatedString = ' and '
): string => {
  if (index < length - 2) return ', ';
  if (index === length - 2) return translatedString;
  return '';
};
