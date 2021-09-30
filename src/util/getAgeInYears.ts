export const getAgeInYears = (date: string): number =>
  new Date(new Date().getTime() - new Date(date).getTime()).getFullYear() -
  1970;
