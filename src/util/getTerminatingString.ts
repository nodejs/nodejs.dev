export const getTerminatingString = (index: number, length: number): string => {
  if (index < length - 2) return ', ';
  if (index === length - 2) return ' and ';
  return '';
};
