export const isAbsoluteUrl = (link: string) => {
  let url;
  try {
    url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};
