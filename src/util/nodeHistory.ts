export const getAgeInYears = (date: string): number =>
  new Date(new Date().getTime() - new Date(date).getTime()).getFullYear() - 1970;

export const isBirthdayToday = (date: string): boolean =>
  new Date().getDate() === new Date(date).getDate() &&
  new Date().getMonth() === new Date(date).getMonth();