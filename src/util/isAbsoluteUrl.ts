export const isAbsoluteUrl = (link: string) => {
  return /^https?:\/\//.test(link);
};
